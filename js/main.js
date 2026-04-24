async function loadJson(path, fallback) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(error);
    return fallback;
  }
}

const fallbackEvents = [
  {
    date: "2026-05",
    title: "NUJRA Monthly Seminar",
    speaker: "TBD",
    description: "月例勉強会の情報をここに掲載します。"
  },
  {
    date: "2026",
    title: "NUJRA-JETRO Chicago Joint Meeting",
    speaker: "NUJRA / JETRO Chicago",
    description: "研究成果の社会実装、キャリア形成、産学連携に関する交流企画。"
  },
  {
    date: "Archive",
    title: "Invited Special Seminars",
    speaker: "Guest speakers",
    description: "過去の招待講演・オンラインセミナーをアーカイブします。"
  }
];

const fallbackMembers = [
  {
    name: "NUJRA Organizing Members",
    affiliation: "Chicago area",
    role: "Organizers",
    description: "幹事・運営メンバーをここに掲載します。"
  },
  {
    name: "Current Members",
    affiliation: "Northwestern University and other institutions",
    role: "Members",
    description: "掲載許可を得た現メンバーをここに追加します。"
  },
  {
    name: "Alumni",
    affiliation: "Former NUJRA members",
    role: "Alumni",
    description: "過去の在籍メンバーをアーカイブとして整理します。"
  }
];

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderEvents(events) {
  const container = document.getElementById("eventList");
  container.innerHTML = events.map(event => `
    <article class="data-item">
      <div class="meta">${escapeHtml(event.date)} · ${escapeHtml(event.speaker)}</div>
      <h3>${escapeHtml(event.title)}</h3>
      <p>${escapeHtml(event.description)}</p>
    </article>
  `).join("");
}

function renderMembers(members) {
  const container = document.getElementById("memberList");
  container.innerHTML = members.map(member => `
    <article class="data-item">
      <div class="meta">${escapeHtml(member.role)} · ${escapeHtml(member.affiliation)}</div>
      <h3>${escapeHtml(member.name)}</h3>
      <p>${escapeHtml(member.description)}</p>
    </article>
  `).join("");
}

async function init() {
  const events = await loadJson("data/events.json", fallbackEvents);
  const members = await loadJson("data/members.json", fallbackMembers);

  renderEvents(events);
  renderMembers(members);
}

init();
