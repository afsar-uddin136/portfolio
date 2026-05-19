# Md. Afsar Uddin — Portfolio Website

A professional, dark-themed portfolio website built with pure HTML, CSS, and JavaScript.

---

## 📁 Project Structure

```
PORTFOLIO/
├── index.html              ← Main HTML file (entry point)
├── assets/
│   ├── css/
│   │   └── style.css       ← All styles, variables, animations
│   ├── js/
│   │   └── main.js         ← All interactivity & animations
│   └── images/             ← Add your profile photo or project screenshots here
└── README.md               ← This file
```

---

## 🚀 How to Run

Simply open `index.html` in any modern browser. No build step required.

For best results, serve locally:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve .
```
Then visit `http://localhost:8000`

---

## ✏️ How to Customize

| What to change | Where to change |
|---|---|
| Your name, bio, summary | `index.html` → Hero & About sections |
| Contact details | `index.html` → Contact section |
| Project info & GitHub links | `index.html` → Projects section |
| Colors / fonts | `assets/css/style.css` → `:root` variables |
| Typed text roles | `assets/js/main.js` → `texts` array |
| Add new projects | Copy a `.project-card` block in `index.html` |
| Add a profile photo | Place image in `assets/images/`, add `<img>` tag in About section |

---

## 🎨 Tech Used

- HTML5, CSS3, Vanilla JavaScript
- Google Fonts: Syne, Space Mono, DM Sans
- Intersection Observer API (scroll animations)
- Custom CSS cursor, typed text effect, counter animations

---

## 📬 Contact

**Email:** afsar725412@gmail.com  
**LinkedIn:** [afsar-uddin-3aa7b2357](https://www.linkedin.com/in/afsar-uddin-3aa7b2357/)  
**GitHub:** [afsar-uddin136](https://github.com/afsar-uddin136)