const grid = document.getElementById('grid');
const statusEl = document.getElementById('status');
const q = document.getElementById('q');
const tagSelect = document.getElementById('tag');
const counter = document.getElementById('counter');

let BOOKS = [];

function niceTagColor(tag){
  const t = (tag || "").toLowerCase();
  if (t.includes("visual") || t.includes("plot")) return "science";
  if (t.includes("ml") || t.includes("machine")) return "yellow";
  if (t.includes("analysis") || t.includes("python") || t.includes("stats")) return "morado";
  if (t.includes("data") || t.includes("sql") || t.includes("clean") || t.includes("engineering")) return "innov";
  return "";
}

function matches(book){
  const query = (q.value || "").toLowerCase().trim();
  const chosen = tagSelect.value;

  const hay = [book.title, book.desc, ...(book.tags || [])].join(" ").toLowerCase();
  const queryOk = !query || hay.includes(query);
  const tagOk = !chosen || (book.tags || []).includes(chosen);
  return queryOk && tagOk;
}

function el(tag, attrs={}, children=[]){
  const node = document.createElement(tag);
  for (const [k,v] of Object.entries(attrs)){
    if (k === "class") node.className = v;
    else node.setAttribute(k, v);
  }
  for (const c of children){
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
}

function render(){
  const filtered = BOOKS.filter(matches);
  grid.innerHTML = "";
  statusEl.textContent = "";
  counter.textContent = `${filtered.length} / ${BOOKS.length} books`;

  if (!filtered.length){
    statusEl.textContent = "No results found. Try a different search or clear the filters.";
    return;
  }

  for (const b of filtered){
    const badges = el("div", {class:"badges"}, (b.tags||[]).map(t =>
      el("span", {class:`badge ${niceTagColor(t)}`}, [t])
    ));

    const actions = el("div", {class:"actions"}, [
      el("a", {class:"pill pdf", href:b.pdf, download:""}, [
        el("span", {class:"icon", "aria-hidden":"true"}, ["🟡"]),
        "Download PDF"
      ]),
    ]);

    const card = el("article", {class:"card"}, [
      el("div", {class:"cover"}, [
        el("img", {src:b.cover, alt:`Portada: ${b.title}`, loading:"lazy"})
      ]),
      el("div", {class:"content"}, [
        el("h2", {}, [b.title]),
        badges,
        el("p", {class:"desc"}, [b.desc]),
        actions
      ])
    ]);

    grid.appendChild(card);
  }
}

async function init(){
  try{
    const res = await fetch("books.json", {cache:"no-store"});
    if (!res.ok) throw new Error(`Failed to load books.json (${res.status})`);
    BOOKS = await res.json();

    const tags = Array.from(new Set(BOOKS.flatMap(b => b.tags || []))).sort((a,b)=>a.localeCompare(b));
    for (const t of tags){
      tagSelect.appendChild(el("option", {value:t}, [t]));
    }

    q.addEventListener("input", render);
    tagSelect.addEventListener("change", render);

    render();
  }catch(err){
    console.error(err);
    statusEl.textContent = "Error loading data. Please check books.json.";
  }
}
init();


function toggleMenu(){
  document.getElementById("menu").classList.toggle("show");
}

document.addEventListener("click", (e) => {
  const menu = document.getElementById("menu");
  const btn = document.getElementById("menuBtn");

  if (!menu || !btn) return;

  // click en el botón -> toggle
  if (btn.contains(e.target)) {
    toggleMenu();
    return;
  }

  // click fuera -> cierra
  if (menu.classList.contains("show") && !menu.contains(e.target)) {
    menu.classList.remove("show");
  }
});

