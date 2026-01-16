import { useEffect, useMemo, useState } from "react";
import "./App.css";

const COLORS = [
  { key: "pink", value: "#f06292" },
  { key: "purple", value: "#ab47bc" },
  { key: "yellow", value: "#ffd54f" },
  { key: "blue", value: "#4fc3f7" },
  { key: "green", value: "#b7d77a" },
];

const STORAGE_KEY = "notesapp_notes_v1";
const MAX_LEN = 500;

export default function App() {
  const [noteText, setNoteText] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);
  const [search, setSearch] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  const initialNotes = useMemo(
    () => [
      { id: 1, text: "Note 3", color: "#b7d77a" },
      { id: 2, text: "Note 2", color: "#4fc3f7" },
      { id: 3, text: "Note 1", color: "#ffd54f" },
    ],
    []
  );

  const [notes, setNotes] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return initialNotes;

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return initialNotes;

      return parsed
        .filter(
          (n) =>
            n &&
            typeof n.id !== "undefined" &&
            typeof n.text === "string" &&
            typeof n.color === "string"
        )
        .map((n) => ({ id: n.id, text: n.text, color: n.color }));
    } catch {
      return initialNotes;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // ignore
    }
  }, [notes]);

  function handleAdd() {
    const text = noteText.trim();
    if (!text) return;

    const newNote = {
      id: Date.now(),
      text: text.slice(0, MAX_LEN),
      color: selectedColor,
    };

    setNotes((prev) => [newNote, ...prev]);
    setNoteText("");
  }

  function handleDelete(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setSelectedNote((prev) => (prev?.id === id ? null : prev));
  }

  const searchTerm = search.toLowerCase().trim();
  const isSearching = searchTerm.length > 0;

  const filteredNotes = notes.filter((n) =>
    n.text.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">NotesApp</h1>

        <input
          className="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="editor">
          <textarea
            className="textarea"
            placeholder="Enter your note here..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value.slice(0, MAX_LEN))}
          />

          <div className="counter">
            {noteText.length}/{MAX_LEN}
          </div>

          <div className="editorFooter">
            <div className="colors">
              {COLORS.map((c) => {
                const isSelected = selectedColor === c.value;

                return (
                  <button
                    key={c.key}
                    className={`dot ${c.key} ${isSelected ? "selected" : ""}`}
                    aria-label={c.key}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedColor(c.value)}
                    type="button"
                  />
                );
              })}
            </div>

            <button className="addBtn" onClick={handleAdd}>
              ADD
            </button>
          </div>
        </div>

        <div className="notesRow">
          {filteredNotes.map((n) => (
            <div
              key={n.id}
              className={`noteCard ${isSearching ? "expanded" : ""}`}
              style={{ background: n.color }}
              title={n.text}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedNote(n)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedNote(n);
              }}
            >
              <button
                className="deleteBtn"
                type="button"
                aria-label="Delete note"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(n.id);
                }}
              >
                ✕
              </button>

              <div className="noteText">{n.text}</div>
            </div>
          ))}
        </div>

        {selectedNote && (
          <div className="modalOverlay" onClick={() => setSelectedNote(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div
                className="modalColorBar"
                style={{ background: selectedNote.color }}
              />

              <div className="modalHeader">
                <div className="modalTitle">Note</div>
                <button
                  className="modalClose"
                  onClick={() => setSelectedNote(null)}
                  type="button"
                >
                  ✕
                </button>
              </div>

              <div className="modalBody">{selectedNote.text}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}






