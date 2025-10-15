# 🎨 React Artworks Table

This project displays artworks from the **Art Institute of Chicago API** with pagination, row selection, and persistent selections across pages.  
It was built as part of a React Internship assignment.

---

## 🚀 Live Demo
🔗 [https://reactartworks.netlify.app/](https://reactartworks.netlify.app/)

---

## 🧩 Features

- Fetches artworks dynamically from the public API  
- Pagination with API calls on every page change (no preloading or caching all pages)  
- Individual and “Select All” row selection  
- Selections and deselections persist across pages  
- “Select N Rows” feature via chevron dropdown  
- Clean, minimal UI with PrimeReact components  
- Fully responsive and optimized for smooth performance  

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend Framework | React 19 (TypeScript + Vite) |
| UI Components | PrimeReact, PrimeIcons |
| Styling | Custom CSS + PrimeReact Theme |
| API Calls | Axios |
| Deployment | Netlify |

---

## 🧠 Project Highlights

- Efficient use of API calls — data is fetched only for the current page.  
- State management ensures selected rows persist across pagination.  
- Numeric selector allows selecting a specific number of rows dynamically.  
- No memory leaks — app doesn’t hold data from all pages.  
- Built using modern React Hooks and functional components.

---

## 📜 API Used

**Base URL:**  
`https://api.artic.edu/api/v1/artworks`

This is a public API of Art Institute of Chicago for open data access.

---

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/imkk21/react_artworks.git
cd react_artworks
