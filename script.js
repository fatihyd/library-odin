function Book(author, title, numOfPages, isRead) {
    this.author = author;
    this.title = title;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
}

let myLibrary = [];

function addBookToLibrary(book) {
    myLibrary.push(book);
}

let bookContainer = document.querySelector("#book-container");
let addBookButton = document.querySelector("#add-book");

addBookButton.addEventListener("click", addBookHandler);

function addBookHandler() {

}