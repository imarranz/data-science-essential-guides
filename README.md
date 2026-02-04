
# Data Science Essential Guides

A lightweight, static web application for hosting and browsing the **Data Science Essential Guides**, A curated collection of Data Science books available as downloadable PDFs.

The site provides fast search, topic filtering, and a clean card-based layout to explore technical books built by data scientists, for data scientists.

---

## ✨ Features

- Static frontend (no backend, no framework)
- Card-based layout with cover images
- Full-text search (title, description, tags)
- Topic/tag filtering
- Direct PDF downloads
- Responsive design
- Minimal, modern UI
- Designed for GitHub Pages

---

## 📁 Project Structure

```text
.
├── index.html
├── books.json
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   └── img/
│       └── *.png        # Book covers
├── books/
│   └── *.pdf            # PDF files
└── README.md
````

### Key files

* `index.html`
  Main entry point.

* `books.json`
  Metadata for all books (title, tags, description, paths).

* `assets/js/app.js`
  Rendering logic, filtering, search, and UI behavior.

* `assets/css/styles.css`
  Design system and layout.

---

## 📚 Adding a Book

1. Copy the PDF into:

```bash
books/
```

2. Add a PNG cover into:

```bash
assets/img/
```

The filename must match the PDF slug:

```text
essential-guide-to-pandas.pdf
essential-guide-to-pandas.png
```

3. Add an entry to `books.json`:

```json
{
  "slug": "essential-guide-to-pandas",
  "title": "Essential Guide to pandas",
  "tags": ["Analysis", "Python"],
  "desc": "Short description here.",
  "pdf": "books/essential-guide-to-pandas.pdf",
  "cover": "assets/img/essential-guide-to-pandas.png"
}
```

That’s it — no build step required.

---

## 🚀 Local Development

Serve locally using Python:

```bash
python -m http.server
```

Then open:

```text
http://localhost:8000
```

---

## 🌍 Deployment (GitHub Pages)

1. Push this repository to GitHub.
2. Go to:

```
Settings → Pages
```

3. Enable Pages from:

```
Branch: main
Folder: /
```

Your site will be available at:

```
https://imarranz.github.io/essential-guides-data-science/
```

---

## 🧠 Design Philosophy

* No frameworks
* No backend
* No build tooling
* Pure HTML + CSS + JavaScript
* Everything readable in one sitting

The goal is clarity, reproducibility, and editorial simplicity.

---

## 🤝 Contributing

Your contributions help make this a living, collaborative resource.

If you have ideas for improving the UI, adding features, or refining the experience:

* Open an issue
* Submit a pull request
* Share feedback

Found it useful? Support it on GitHub ⭐

---

## 👤 Author

**Ibon Martínez-Arranz**
GitHub: [https://github.com/imarranz](https://github.com/imarranz)

---

