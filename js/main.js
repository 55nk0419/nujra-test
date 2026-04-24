const DATA_PATHS = {
  resources: "data/resources.json",
  members: "data/members.json"
};

async function loadJson(path, fallback = []) {
  try {
    const response = await fetch(path, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`${path}: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn("JSON load failed:", error);
    return fallback;
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getInitials(name) {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return parts[0] ? parts[0].slice(0, 2).toUpperCase() : "N";
}

function setupMobileMenu() {
  const button = document.querySelector(".menu-button");
  const nav = document.querySelector(".site-nav");
  if (!button || !nav) return;

  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
}

function makeResourceCard(item) {
  const inner = `
    <span class="badge">${escapeHtml(item.category)}</span>
    <h3>${escapeHtml(item.title)}</h3>
    <p>${escapeHtml(item.description)}</p>
    <div class="meta">最終更新: ${escapeHtml(item.updated)}</div>
    <span class="card-action">${item.url ? "詳細を見る" : "準備中"}</span>
  `;

  if (item.url) {
    return `
      <a class="resource-card resource-card-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">
        ${inner}
      </a>
    `;
  }

  return `
    <article class="resource-card resource-card-disabled">
      ${inner}
    </article>
  `;
}

function makeMemberCard(item) {
  const initials = getInitials(item.nameEn || item.nameJa || "");
  const description = item.description ? `<p>${escapeHtml(item.description)}</p>` : `<p class="muted-text">紹介文は準備中です。</p>`;

  return `
    <article class="member-card">
      <div class="member-avatar" aria-hidden="true">${escapeHtml(initials)}</div>
      <div class="member-body">
        <div class="member-name">
          <h3>${escapeHtml(item.nameJa)}</h3>
          <span>${escapeHtml(item.nameEn)}</span>
        </div>
        <div class="member-affiliation">${escapeHtml(item.affiliation)}</div>
        ${description}
      </div>
    </article>
  `;
}

function filterItems(items, query, category = "すべて") {
  const q = query.trim().toLowerCase();

  return items.filter(item => {
    const matchesCategory = category === "すべて" || item.category === category;
    const text = Object.values(item).join(" ").toLowerCase();
    const matchesQuery = !q || text.includes(q);
    return matchesCategory && matchesQuery;
  });
}

function renderFilterButtons(container, labels, onChange) {
  if (!container) return;

  container.innerHTML = labels.map((label, index) => `
    <button class="filter-button ${index === 0 ? "active" : ""}" type="button" data-filter="${escapeHtml(label)}">
      ${escapeHtml(label)}
    </button>
  `).join("");

  container.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;

    container.querySelectorAll(".filter-button").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    onChange(button.dataset.filter);
  });
}

async function initHome() {
  const homeResourceList = document.getElementById("homeResourceList");

  if (homeResourceList) {
    const resources = await loadJson(DATA_PATHS.resources);
    const limit = Number(homeResourceList.dataset.limit || 6);
    homeResourceList.innerHTML = resources.slice(0, limit).map(makeResourceCard).join("") || emptyState("情報はまだ登録されていません。");
  }
}

async function initResourcesPage() {
  const list = document.getElementById("resourceList");
  if (!list) return;

  const resources = await loadJson(DATA_PATHS.resources);
  list.innerHTML = resources.map(makeResourceCard).join("") || emptyState("情報はまだ登録されていません。");
}

async function initMembersIfPresent() {
  const allMembers = await loadJson("data/members.json");

  const targets = [
    { id: "organizerList", category: "幹事" },
    { id: "formerOrganizerList", category: "元幹事・創設メンバー" },
    { id: "currentMemberList", category: "2024年度メンバー" },
    { id: "memberList", category: null }
  ];

  targets.forEach(target => {
    const container = document.getElementById(target.id);
    if (!container) return;

    const members = target.category
      ? allMembers.filter(member => member.category === target.category)
      : allMembers;

    container.innerHTML = members.map(makeMemberCard).join("") || emptyState("メンバー情報はまだ登録されていません。");
  });
}

function emptyState(message) {
  return `<div class="empty-state">${escapeHtml(message)}</div>`;
}

setupMobileMenu();
initHome();
initResourcesPage();
initMembersIfPresent();
