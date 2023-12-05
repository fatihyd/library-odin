/* Book object constructor */
function Book(author, title, numOfPages, isRead) {
    this.author = author;
    this.title = title;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
}

/* array of Book objects */
let myLibrary = [];

/* elements already in the DOM */
let booksContainer = document.querySelector("#books-container");
let addBookButton = document.querySelector("#add-book");
let dialog = document.querySelector("dialog");

/* event listeners for the elements that do not exist yet */
document.addEventListener("click", function (event) {
    if (event.target.id === "submit-button") {
        submitHandler();
    }
})

/* event listener for the Add Book button */
addBookButton.addEventListener("click", addBookHandler);

/* seperate function to handle the Add Book button */
function addBookHandler() {
    /* shows the dialog */
    dialog.showModal();
    /* prevents page refresh */
    document.querySelector("#add-book-form").addEventListener("submit", function (event) {
        event.preventDefault();
    })
}

/* seperate function to handle the Submit button */
function submitHandler() {
    /* gets the input values */
    let author = document.querySelector("#author-input").value;
    let title = document.querySelector("#title-input").value;
    let numOfPages = document.querySelector("#pages-input").value;
    let isRead = document.querySelector("#read-input").checked;
    /* creates a new Book object and adds it to the library */
    let newBook = new Book(author, title, numOfPages, isRead);
    myLibrary.push(newBook);
    /* resets the form */
    document.querySelector("#add-book-form").reset();
    /* closes the dialog and displays all books */
    dialog.close();
    displayAllBooks();
}

function createBookElement(book) {
    let bookContainer = document.createElement("div");

    let author = document.createElement("p");
    author.textContent = book.author;

    let title = document.createElement("p");
    title.textContent = book.title;

    let numOfPages = document.createElement("p");
    numOfPages.textContent = book.numOfPages;

    let isRead = document.createElement("p");
    isRead.textContent = book.isRead;

    bookContainer.append(author, title, numOfPages, isRead);
    return bookContainer;
}

function displayAllBooks() {
    /* clears all previous books in the DOM */
    booksContainer.innerHTML = "";
    /* adds all books in library to the DOM */
    for (let i = 0; i < myLibrary.length; i++) {
        booksContainer.appendChild(createBookElement(myLibrary[i]));
    }
}
