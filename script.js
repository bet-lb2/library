const dialog = document.querySelector("dialog");
const form = document.querySelector("dialog form");
const addNewBookButton = document.getElementById("add-new-book-button");
const closeDialogButton = document.getElementById("close-dialog-button");
const display = document.getElementById("display");
const launchDialogButton = document.getElementById("launch-dialog-button");

const myLibrary = [
    {
        title: "sample title",
        author: "sample",
        pages: 244,
        read: false
    },
    {
        title: "sample 2",
        author: "sample author",
        pages: 1000,
        read: true
    }
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    display.innerHTML = "";
    myLibrary.forEach(book => {
        display.innerText += `${book.title} ${book.author} ${book.pages} ${book.read}\n`;
    })
}

displayBooks();

launchDialogButton.addEventListener("click", () => {
    dialog.showModal();
})

closeDialogButton.addEventListener("click", (e) => {
    form.reset();
    dialog.close();
})
addNewBookButton.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    let status;
    const radio = document.querySelectorAll("input[type='radio']")
    radio.forEach(item => {
        if (item.checked === true) {
            status = item.value;
        }
    })
    if (!title || !author || !pages) {
        alert("Please set valid value.")
        return;
    }
    addBookToLibrary(title, author, pages, status);
    dialog.close();
})
