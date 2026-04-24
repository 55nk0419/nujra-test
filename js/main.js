const DATA_PATHS = {
  events: "data/events.json",
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

function setupMobileMenu() {
  const button = document.querySelector(".menu-button");
  const nav = document.querySelector(".site-nav");
  if (!button || !nav) return;

  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
}

function makeDataCard(item) {
  const type = item.type ? `<span class="badge">${escapeHtml(item.type)}</span>` : "";
  const date = item.date ? escapeHtml(item.date) : "";
  const speaker = item.speaker ? ` · ${escapeHtml(item.speaker)}` : "";
  const location = item.location ? ` · ${escapeHtml(item.location)}` : "";

  return `
    <article class="data-card">
      <div>${type}</div>
      <div class="meta">${date}${speaker}${location}</div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
      ${item.url ? `<a class="text-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">View details</a>` : ""}
    </article>
  `;
}

function makeResourceCard(item) {
  return `
    <article class="resource-card">
      <span class="badge">${escapeHtml(item.category)}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
      <div class="meta">Updated: ${escapeHtml(item.updated)}</div>
      ${item.url ? `<a class="text-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">Open resource</a>` : ""}
    </article>
  `;
}

function makeMemberCard(item) {
  const field = item.field ? ` · ${escapeHtml(item.field)}` : "";
  return `
    <article class="data-card">
      <div class="meta">${escapeHtml(item.role)} · ${escapeHtml(item.affiliation)}${field}</div>
      <h3>${escapeHtml(item.name)}</h3>
      <p>${escapeHtml(item.description)}</p>
      ${item.url ? `<a class="text-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">Profile / Lab</a>` : ""}
    </article>
  `;
}

function filterItems(items, query, type = "all") {
  const q = query.trim().toLowerCase();

  return items.filter(item => {
    const matchesType = type === "all" || item.type === type || item.category === type;
    const text = Object.values(item).join(" ").toLowerCase();
    const matchesQuery = !q || text.includes(q);
    return matchesType && matchesQuery;
  });
}

function renderFilterButtons(container, labels, onChange) {
  if (!container) return;

  container.innerHTML = labels.map((label, index) => `
    <button class="filter-button ${index === 0 ? "active" : ""}" type="button" data-filter="${escapeHtml(label)}">
      ${escapeHtml(label === "all" ? "All" : label)}
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
  const homeEventList = document.getElementById("homeEventList");
  const homeResourceList = document.getElementById("homeResourceList");

  if (homeEventList) {
    const events = await loadJson(DATA_PATHS.events);
    const limit = Number(homeEventList.dataset.limit || 3);
    homeEventList.innerHTML = events.slice(0, limit).map(makeDataCard).join("") || emptyState("No events yet.");
  }

  if (homeResourceList) {
    const resources = await loadJson(DATA_PATHS.resources);
    const limit = Number(homeResourceList.dataset.limit || 6);
    homeResourceList.innerHTML = resources.slice(0, limit).map(makeResourceCard).join("") || emptyState("No resources yet.");
  }
}

async function initEventsPage() {
  const list = document.getElementById("eventList");
  if (!list) return;

  const search = document.getElementById("eventSearch");
  const filterRow = document.getElementById("eventFilterRow");
  const events = await loadJson(DATA_PATHS.events);
  const types = ["all", ...Array.from(new Set(events.map(item => item.type).filter(Boolean)))];

  let activeType = "all";

  function render() {
    const filtered = filterItems(events, search?.value || "", activeType);
    list.innerHTML = filtered.map(makeDataCard).join("") || emptyState("No matching events.");
  }

  renderFilterButtons(filterRow, types, type => {
    activeType = type;
    render();
  });

  search?.addEventListener("input", render);
  render();
}

async function initResourcesPage() {
  const list = document.getElementById("resourceList");
  if (!list) return;

  const search = document.getElementById("resourceSearch");
  const filterRow = document.getElementById("resourceFilterRow");
  const resources = await loadJson(DATA_PATHS.resources);
  const categories = ["all", ...Array.from(new Set(resources.map(item => item.category).filter(Boolean)))];

  let activeCategory = "all";

  function render() {
    const filtered = filterItems(resources, search?.value || "", activeCategory);
    list.innerHTML = filtered.map(makeResourceCard).join("") || emptyState("No matching resources.");
  }

  renderFilterButtons(filterRow, categories, category => {
    activeCategory = category;
    render();
  });

  search?.addEventListener("input", render);
  render();
}

async function initMembersIfPresent() {
  const list = document.getElementById("memberList");
  if (!list) return;

  const members = await loadJson(DATA_PATHS.members);
  list.innerHTML = members.map(makeMemberCard).join("") || emptyState("No members yet.");
}

function emptyState(message) {
  return `<div class="empty-state">${escapeHtml(message)}</div>`;
}

setupMobileMenu();
initHome();
initEventsPage();
initResourcesPage();
initMembersIfPresent();
