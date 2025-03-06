import "./styles.css";

const addBookBtn = document.getElementById("add-book-btn");
const books = document.getElementById("books");
const dialog = document.getElementById("dialog");
const dialogBackDrop = document.querySelector("#dialog::backdrop");
console.log(dialogBackDrop)

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.id = crypto.randomUUID();
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(newBook) {
        this.books.push(newBook);
    }

    removeBook(id) {
        this.books = this.books.filter(book => book.id !== id);
    }

    getBooks() {
        return this.books;
    }

    setBooks(books) {
        this.books = books;
    }
}

const myLibrary = new Library();
if (getLocalStorage()) {
    myLibrary.setBooks(getLocalStorage().books);
}
displayBooks();

function displayBooks() {
    books.innerHTML = "";
    myLibrary.getBooks().forEach(book => {
        books.innerHTML += `
        <div data-id="${book.id}" class="book">
            <p class="book-title">"${book.title}"</p>
            <p class="book-author">${book.author}</p>
            <p class="book-pages">${book.pages} pages</p>
            <button class="is-read-btn ${book.isRead === true ? "green" : "red"}">${book.isRead === true ? "Read" : "Not Read"}</button>
            <button class="remove-btn">Remove</button>
        </div>`
    })
    document.querySelectorAll(".is-read-btn").forEach(isReadBtn => {
        isReadBtn.addEventListener("click", (e) => {
            const bookId = e.target.parentNode.dataset.id;
            myLibrary.getBooks().forEach(book => {
                if (book.id === bookId) {
                    book.isRead = book.isRead === true ? false : true;
                }
            })
            updateLocalStorage();
            displayBooks();
        })
    })
    document.querySelectorAll(".remove-btn").forEach(removeBtn => {
        removeBtn.addEventListener("click",(e) => {
            const bookId = e.target.parentNode.dataset.id;
            myLibrary.setBooks(myLibrary.getBooks().filter(book => book.id !== bookId));
            updateLocalStorage();
            displayBooks();
        })
    })
}

function updateLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function getLocalStorage() {
    return JSON.parse(localStorage.getItem("myLibrary"));
}

function createForm() {
    dialog.innerHTML = "";
    dialog.innerHTML = `
    <form novalidate>
        <h3>Add new book</h3>
        <input id="title" type="text" placeholder="Title">
        <input id="author" type="text" placeholder="Author">
        <input id="pages" type="number" placeholder="Pages">
        <div class="is-read">
            <label for="isRead">Have you read it ?</label>
            <input id="is-read" type="checkbox">
        </div>
        <button id="submit">Submit</button>
    </form>`;
    dialog.showModal();
    dialog.addEventListener('click', function(event) {
        var rect = dialog.getBoundingClientRect();
        var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        if (!isInDialog) {
          dialog.close();
        }
      });
    document.getElementById("submit").addEventListener("click", (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const isRead = document.getElementById("is-read").value;
        myLibrary.addBook(new Book(title, author, pages, isRead));
        dialog.close();
        updateLocalStorage();
        displayBooks();
    })
}

addBookBtn.addEventListener("click", createForm)
