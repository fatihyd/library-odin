/* Book object constructor */
function Book(author, title, numOfPages, isRead, bookContainer) {
    this.author = author;
    this.title = title;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
    this.bookContainer = bookContainer;
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
    } else if (event.target.className === "remove-button") {
        removeHandler(event);
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
    /* gets the input values and creates a container */
    let author = document.querySelector("#author-input").value;
    let title = document.querySelector("#title-input").value;
    let numOfPages = document.querySelector("#pages-input").value;
    let isRead = document.querySelector("#read-input").checked;
    let bookContainer = createBookContainer(author, title, numOfPages, isRead);
    /* creates a new Book object and adds it to the library */
    let newBook = new Book(author, title, numOfPages, isRead, bookContainer);
    myLibrary.push(newBook);
    /* resets the form */
    document.querySelector("#add-book-form").reset();
    /* closes the dialog and displays all books */
    dialog.close();
    displayAllBooks();
}

function removeHandler(event) {
    let bookContainerToRemove = event.target.parentElement;
    let indexToRemove;
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].bookContainer === bookContainerToRemove) {
            indexToRemove = i;
        }
    }
    myLibrary.splice(indexToRemove, 1);
    displayAllBooks();
}

function createBookContainer(author, title, numOfPages, isRead) {
    let bookContainer = document.createElement("div");

    let authorElement = document.createElement("p");
    authorElement.textContent = "author: " + author;

    let titleElement = document.createElement("p");
    titleElement.textContent = "title: " + title;

    let numOfPagesElement = document.createElement("p");
    numOfPagesElement.textContent = numOfPages + " pages";

    let isReadElement = document.createElement("p");
    isReadElement.textContent = isRead;

    let removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.textContent = "remove book";

    bookContainer.append(authorElement, titleElement, numOfPagesElement, isReadElement, removeButton);
    return bookContainer;
}

function displayAllBooks() {
    /* clears all previous books in the DOM */
    booksContainer.innerHTML = "";
    /* adds all books in library to the DOM */
    for (let i = 0; i < myLibrary.length; i++) {
        booksContainer.appendChild(myLibrary[i].bookContainer);
    }
}
