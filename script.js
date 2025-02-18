const dialog = document.querySelector("dialog");
const form = document.querySelector("dialog form");
const addNewBookButton = document.getElementById("new-book-button");
const closeDialogButton = document.getElementById("close-dialog-button");
const display = document.getElementById("display");
const launchDialogButton = document.getElementById("launch-dialog-button");

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
    console.log(this.read)
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    display.innerHTML = "";
    myLibrary.forEach((book, index) => {
        display.innerHTML += `<div data-index="${index}">${book.title} ${book.author} ${book.pages} ${book.read ? "read" : "unread"}<button class="remove-button">remove</button><button class="toggle-read-status"">toggle read status</button></div>\n`;
    })
    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach(removeButton => {
        removeButton.addEventListener("click", (e) => {
            const index = e.target.parentNode.dataset.index;
            myLibrary.splice(index, 1);
            displayBooks();
        })
        const toggleReadStatusButtons = document.querySelectorAll(".toggle-read-status");
        toggleReadStatusButtons.forEach(toggleReadStatusButton => {
            toggleReadStatusButton.addEventListener("click", (e) => {
                e.stopImmediatePropagation();
                const index = e.target.parentNode.dataset.index;
                myLibrary[index].toggleReadStatus();
                displayBooks()
            })
        })
    })
}

addBookToLibrary("sample", "sample", 455, true);
addBookToLibrary("sample2", "sample2", 1000, false);
addBookToLibrary("sample3", "sample3", 10000, true);

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
