# NotesApp — React (Vite)

A simple **note-taking** app built with **React + Vite**.  
Create colorful notes, search instantly, open notes in a modal to read the full text, and keep everything saved with **localStorage**.

---

## Live Demo

- [Vercel live demo](https://notes-app-react-puce.vercel.app/)

---

## Features

- **Create Notes**
  - Write a note in the textarea
  - Pick a color from the palette
  - Click **ADD** to add the note

- **Search**
  - Type in the **Search...** input to filter notes by text

- **Read Full Note**
  - Notes are shown with a **3-line clamp** on the card
  - Click any note card to open a **modal** and read the full content
  - Modal header shows a thin **color bar** matching the note color

- **Delete Notes**
  - Each note card has an **✕** button to remove it

- **Persistence**
  - Notes are stored in **localStorage**
  - Notes stay after refresh / reopening the page

- **Character Counter + Limit**
  - Shows `current/MAX` under the textarea
  - Input is limited to **300 characters** (editable in code)

---

## Getting Started

### Requirements
- Node.js (LTS recommended)
- npm

### Install & Run

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

### Build

```bash
npm run build
npm run preview
```

---

## Tech Stack

- React (Vite)
- CSS3
- localStorage

---

## Project Structure (basic)

```text
notes-app/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
└── package.json
```

---

## Implementation Notes

- Notes are stored under the key:
  - `notesapp_notes_v1`

- Note length is limited by:
  - `MAX_LEN = 500` in `App.jsx`

- The modal color bar uses:
  - `selectedNote.color`

---

## Thanks

This project was created with the support of **Patika.dev Fullstack Java Developer Bootcamp**.  
Special thanks to the instructors and community contributors.

---

## License

This project is currently **unlicensed**.  
You are free to use, modify, and learn from the code.
