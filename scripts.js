// scripts.js
let notes = [];

function addNote() {
    const noteText = document.getElementById('note-input').value;
    const noteColor = document.getElementById('color-picker').value;
    
    if (noteText.trim() === '') {
        alert('Please enter a note.');
        return;
    }
    
    const note = {
        text: noteText,
        color: noteColor
    };
    
    notes.push(note);
    renderNotes();
    
    // Clear input
    document.getElementById('note-input').value = '';
}

function deleteNote(index) {
    notes.splice(index, 1);
    renderNotes();
}

function renderNotes() {
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = '';
    
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.style.backgroundColor = note.color;
        
        const noteText = document.createElement('p');
        noteText.textContent = note.text;
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = '&#10006;';
        deleteButton.onclick = () => deleteNote(index);
        
        noteElement.appendChild(noteText);
        noteElement.appendChild(deleteButton);
        notesContainer.appendChild(noteElement);
        
        // Make note draggable
        makeDraggable(noteElement);
    });
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
