class Note {
  constructor(title) {
    this.title = title;
    this.element = this.createElement(title);
  }
  
  createElement(title){
    let newNote = document.createElement('div');
    let p = document.createElement('p');
    let a = document.createElement('a');

    newNote.classList.add('card');
    p.innerHTML = title;
    a.href = '#';
    a.classList.add('card-remove');
    a.innerHTML = 'Remove';
    a.addEventListener('click', this.remove.bind(newNote));
    this.add(newNote, p, a);
  }
  
  add(n, p, a){
    // HINT🤩
    // this function should append the note to the screen somehow
    let notes = document.querySelector('.notes');
    notes.appendChild(n);
    n.appendChild(p);
    n.appendChild(a);
  }
  
  saveToStorage(title){
    // HINT🤩
    // localStorage only supports strings, not arrays
    // if you want to store arrays, look at JSON.parse and JSON.stringify
    //let i = localStorage.length;
    localStorage.setItem(title, title);
    console.log(localStorage.length);
  }

  remove(newNote){
    // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
    // in this function, 'this' will refer to the current note element
    //for (let i = 0; i < localStorage.length; i++) {
    //  if (localStorage.getItem(i) === newNote) {
    //    localStorage.removeItem(i);
    //  }
    //}
    localStorage.removeItem(this.getElementsByTagName('p')[0].innerHTML);
    this.remove();
  } 
}

class App {
  constructor() {
    console.log("👊🏼 The Constructor!");
    this.loadNotesFromStorage();
    this.btnAdd = document.querySelector('#btnAddNote');
    this.btnAdd.addEventListener('click', this.createNote.bind(this));
    // HINT🤩
    // clicking the button should work
    // pressing the enter key should also work
    // this.btnAdd = ???
    // this.btnAdd.addEventListener("click", this.createNote.bind(this));
    // this.loadNotesFromStorage();
  }
  
  loadNotesFromStorage() {
    // HINT🤩
    // load all notes from storage here and add them to the screen
    // something like note.add() in a loop would be nice
    for (let i = 0; i < localStorage.length; i++) {
      let note = new Note(localStorage.getItem(i));
      console.log(localStorage.getItem(i));
    }
  }
   
  createNote(e){
    // this function should create a new note by using the Note() class
    let value = document.querySelector('#txtAddNote').value;
    if (value !== '') {
      let note = new Note(value);
      note.saveToStorage(value);
      this.reset();
    }
    // HINT🤩
    // note.add();
    // note.saveToStorage();
    // this.reset();
  }
  
  reset(){
    // this function should reset the form 
    document.querySelector('form').reset();
    document.querySelector('#txtAddNote').focus();
  }
  
}

let app = new App();