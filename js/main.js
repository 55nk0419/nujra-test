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
  return `
    <article class="resource-card">
      <span class="badge">${escapeHtml(item.category)}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
      <div class="meta">最終更新: ${escapeHtml(item.updated)}</div>
      ${item.url ? `<a class="text-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">詳細を見る</a>` : ""}
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
      ${item.url ? `<a class="text-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">プロフィール / ラボ</a>` : ""}
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

  const search = document.getElementById("resourceSearch");
  const filterRow = document.getElementById("resourceFilterRow");
  const resources = await loadJson(DATA_PATHS.resources);
  const categories = ["すべて", ...Array.from(new Set(resources.map(item => item.category).filter(Boolean)))];

  let activeCategory = "すべて";

  function render() {
    const filtered = filterItems(resources, search?.value || "", activeCategory);
    list.innerHTML = filtered.map(makeResourceCard).join("") || emptyState("該当する情報がありません。");
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

  const members = await loadJson("data/members.json");
  list.innerHTML = members.map(makeMemberCard).join("") || emptyState("メンバー情報はまだ登録されていません。");
}

function emptyState(message) {
  return `<div class="empty-state">${escapeHtml(message)}</div>`;
}

setupMobileMenu();
initHome();
initResourcesPage();
initMembersIfPresent();
