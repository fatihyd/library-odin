function Book(author, title, numOfPages, isRead) {
    this.author = author;
    this.title = title;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
}

let myLibrary = [];

let booksContainer = document.querySelector("#books-container");
let addBookButton = document.querySelector("#add-book");
let submitButton = document.querySelector("#submit-button");

addBookButton.addEventListener("click", addBookHandler);

function addBookHandler() {
    // show the dialog
    let dialog = document.querySelector("dialog");
    dialog.showModal();

    // prevent page refresh
    document.querySelector("#add-book-form").addEventListener("submit", function (event) {
        event.preventDefault();
    })

    submitButton.addEventListener("click", function () {
        // Get the input values
        let author = document.querySelector("#author-input").value;
        let title = document.querySelector("#title-input").value;
        let numOfPages = document.querySelector("#pages-input").value;
        let isRead = document.querySelector("#read-input").checked;

        // Create a Book object and add it to the array
        let newBook = new Book(author, title, numOfPages, isRead);
        myLibrary.push(newBook);

        // Reset the form
        document.querySelector("#add-book-form").reset();

        // Close the dialog and display all books
        dialog.close();
        displayAllBooks();
    })
}

function displayAllBooks() {
    // clear
    while (booksContainer.firstChild) {
        booksContainer.removeChild(booksContainer.firstChild);
    }

    for (let i = 0; i < myLibrary.length; i++) {
        let bookContainer = document.createElement("div");

        let author = document.createElement("p");
        author.textContent = myLibrary[i].author;

        let title = document.createElement("p");
        title.textContent = myLibrary[i].title;

        let numOfPages = document.createElement("p");
        numOfPages.textContent = myLibrary[i].numOfPages;

        let isRead = document.createElement("p");
        isRead.textContent = myLibrary[i].isRead;

        bookContainer.append(author, title, numOfPages, isRead);
        booksContainer.appendChild(bookContainer);
    }
}