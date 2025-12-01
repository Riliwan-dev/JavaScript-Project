const addNoteBtn = document.getElementById('addNoteBtn');
const notesContainer = document.getElementById('notesContainer');

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes') || '[]');
  notesContainer.innerHTML = "";
  notes.forEach((text) => createNote(text));
}

function saveNotes() {
  const notes = [...document.querySelectorAll('.note')].map(n => n.value);
  localStorage.setItem('notes', JSON.stringify(notes));
}

function createNote(text = "") {
  const textarea = document.createElement('textarea');
  textarea.className = "note";
  textarea.value = text;

  textarea.addEventListener('input', saveNotes);

  textarea.addEventListener('dblclick', () => {
    if (confirm('Delete this note?')) {
      textarea.remove();
      saveNotes();
    }
  });

  notesContainer.appendChild(textarea);
}

addNoteBtn.addEventListener('click', () => {
  createNote();
  saveNotes();
});

loadNotes();
