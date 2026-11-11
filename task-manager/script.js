"use strict";

const STORAGE_KEY = "taskflow.tasks";
const THEME_KEY = "taskflow.theme";
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

const $ = (id) => document.getElementById(id);
const els = {
  form: $("taskForm"), title: $("title"), priority: $("priority"), due: $("due"),
  submit: $("submitBtn"), search: $("search"), sort: $("sort"), list: $("list"),
  empty: $("empty"), clearDone: $("clearDone"), theme: $("themeBtn"),
  filters: document.querySelectorAll("[data-filter]"),
};

const state = {
  tasks: load(),
  filter: "all",
  query: "",
  sort: "created",
  editingId: null,
};


function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
}


const todayStr = () => new Date().toISOString().slice(0, 10);
const isOverdue = (t) => !t.done && t.due && t.due < todayStr();

function visibleTasks() {
  const q = state.query.trim().toLowerCase();
  return state.tasks
    .filter((t) => state.filter === "all" || (state.filter === "done") === t.done)
    .filter((t) => t.title.toLowerCase().includes(q))
    .sort((a, b) => {
      if (state.sort === "priority") return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      if (state.sort === "due") return (a.due || "9999").localeCompare(b.due || "9999");
      return b.createdAt - a.createdAt;
    });
}


function render() {
  const tasks = visibleTasks();
  els.list.replaceChildren(...tasks.map(createItem));
  els.empty.hidden = tasks.length > 0;
  renderStats();
}

function createItem(t) {
  const li = document.createElement("li");
  li.className = `item ${t.priority}${t.done ? " done" : ""}`;
  li.dataset.id = t.id;

  const check = document.createElement("input");
  check.type = "checkbox";
  check.checked = t.done;
  check.setAttribute("aria-label", `Mark "${t.title}" as done`);

  const body = document.createElement("div");
  body.className = "body";
  const name = document.createElement("div");
  name.className = "name";
  name.textContent = t.title; 
  const meta = document.createElement("div");
  meta.className = "meta" + (isOverdue(t) ? " overdue" : "");
  meta.textContent = `${t.priority} priority` + (t.due ? ` · due ${t.due}` : "") + (isOverdue(t) ? " · overdue" : "");
  body.append(name, meta);

  const actions = document.createElement("div");
  actions.className = "actions";
  actions.innerHTML = '<button data-action="edit">Edit</button><button data-action="delete">Delete</button>';

  li.append(check, body, actions);
  return li;
}

function renderStats() {
  const total = state.tasks.length;
  const done = state.tasks.filter((t) => t.done).length;
  $("statTotal").textContent = total;
  $("statDone").textContent = done;
  $("statActive").textContent = total - done;
  $("statOverdue").textContent = state.tasks.filter(isOverdue).length;
}


function addOrUpdate(e) {
  e.preventDefault();
  const title = els.title.value.trim();
  if (!title) return;

  if (state.editingId) {
    const t = state.tasks.find((x) => x.id === state.editingId);
    Object.assign(t, { title, priority: els.priority.value, due: els.due.value });
    state.editingId = null;
    els.submit.textContent = "Add task";
  } else {
    state.tasks.push({
      id: crypto.randomUUID(),
      title,
      priority: els.priority.value,
      due: els.due.value,
      done: false,
      createdAt: Date.now(),
    });
  }
  els.form.reset();
  els.priority.value = "medium";
  save();
  render();
}


function handleListClick(e) {
  const li = e.target.closest(".item");
  if (!li) return;
  const task = state.tasks.find((t) => t.id === li.dataset.id);

  if (e.target.type === "checkbox") {
    task.done = e.target.checked;
  } else if (e.target.dataset.action === "delete") {
    state.tasks = state.tasks.filter((t) => t.id !== task.id);
  } else if (e.target.dataset.action === "edit") {
    state.editingId = task.id;
    els.title.value = task.title;
    els.priority.value = task.priority;
    els.due.value = task.due;
    els.submit.textContent = "Save changes";
    els.title.focus();
    return;
  } else return;

  save();
  render();
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  els.theme.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  localStorage.setItem(THEME_KEY, theme);
}


els.form.addEventListener("submit", addOrUpdate);
els.list.addEventListener("click", handleListClick);
els.search.addEventListener("input", (e) => { state.query = e.target.value; render(); });
els.sort.addEventListener("change", (e) => { state.sort = e.target.value; render(); });
els.filters.forEach((btn) =>
  btn.addEventListener("click", () => {
    state.filter = btn.dataset.filter;
    els.filters.forEach((b) => b.classList.toggle("active", b === btn));
    render();
  })
);
els.clearDone.addEventListener("click", () => {
  state.tasks = state.tasks.filter((t) => !t.done);
  save();
  render();
});
els.theme.addEventListener("click", () =>
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark")
);

setTheme(localStorage.getItem(THEME_KEY) || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
render();
