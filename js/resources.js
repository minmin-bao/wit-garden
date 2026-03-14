function renderResources(activeTag = "all") {
  const grid = document.getElementById("resources-grid");
  grid.innerHTML = "";

  const filtered =
    activeTag === "all"
      ? RESOURCES
      : RESOURCES.filter((r) => r.tag === activeTag);

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="empty">nothing here yet — be the first to add one!</p>`;
    return;
  }

  filtered.forEach((resource) => {
    const card = document.createElement("a");
    card.className = "resource-card";
    card.href = resource.url;
    card.target = "_blank";

    card.innerHTML = `
      ${resource.cover ? `<img src="assets/covers/${resource.cover}" alt="${resource.title}" onerror="this.parentElement.classList.add('no-cover'); this.remove()">` : ""}
      <div class="resource-overlay${resource.cover ? "" : " always-visible"}" data-tag="${resource.tag}">
        <span class="tag tag-${resource.tag}">${resource.tag}</span>
        <div class="resource-title">${resource.title}</div>
        ${resource.author ? `<div class="resource-author">${resource.author}</div>` : ""}
        <p class="resource-desc">${resource.description}</p>
        <div class="resource-by">added by ${resource.added_by}</div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function buildFilters() {
  const container = document.getElementById("filters");
  const tags = ["all", ...new Set(RESOURCES.map((r) => r.tag))];

  tags.forEach((tag) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (tag === "all" ? " active" : "");
    btn.textContent = tag;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) =>
        b.classList.remove("active")
      );
      btn.classList.add("active");
      renderResources(tag);
    });
    container.appendChild(btn);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  buildFilters();
  renderResources();
});
