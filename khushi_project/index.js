document.addEventListener('DOMContentLoaded', () => {
    const notesList = document.getElementById('notesList');
    const noteTitle = document.getElementById('noteTitle');
    const noteContent = document.getElementById('noteContent');
    const saveNoteButton = document.getElementById('saveNote');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    const renderNotes = () => {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note';
            noteDiv.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <div class="note-actions">
                    <button onclick="editNote(${index})">Edit</button>
                    <button onclick="deleteNote(${index})">Delete</button>
                </div>
            `;
            notesList.appendChild(noteDiv);
        });
    };

    const saveNote = () => {
        const title = noteTitle.value;
        const content = noteContent.value;
        if (title && content) {
            const newNote = { title, content };
            if (noteTitle.dataset.index !== undefined) {
                notes[noteTitle.dataset.index] = newNote;
                delete noteTitle.dataset.index;
            } else {
                notes.push(newNote);
            }
            noteTitle.value = '';
            noteContent.value = '';
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes();
        }
    };

    window.editNote = (index) => {
        noteTitle.value = notes[index].title;
        noteContent.value = notes[index].content;
        noteTitle.dataset.index = index;
    };

    window.deleteNote = (index) => {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    };

    saveNoteButton.addEventListener('click', saveNote);
    renderNotes();
});
