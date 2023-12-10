// Book class  
class Book {
    #bookContainer;

    constructor(author, title, numOfPages, isRead) {
        this.author = author;
        this.title = title;
        this.numOfPages = numOfPages;
        this.isRead = isRead;
        this.#bookContainer = document.createElement("div");
    }
    // returns a new book container with the given input  
    createContainer() {
        let authorElement = document.createElement("p");
        authorElement.textContent = "author: " + this.author;

        let titleElement = document.createElement("p");
        titleElement.textContent = "title: " + this.title;

        let numOfPagesElement = document.createElement("p");
        numOfPagesElement.textContent = this.numOfPages + " pages";

        let isReadButton = document.createElement("button");
        isReadButton.className = "read-button";
        isReadButton.textContent = this.isRead ? "read" : "not read";
        isReadButton.style.backgroundColor = this.isRead ? "rgb(99, 218, 99)" : "rgb(224, 79, 99)";

        let removeButton = document.createElement("button");
        removeButton.className = "remove-button";
        removeButton.textContent = "remove book";

        this.#bookContainer.append(authorElement, titleElement, numOfPagesElement, isReadButton, removeButton);
        return this.#bookContainer;
    }
    // returns the book container
    getBookContainer() {
        return this.#bookContainer;
    }
}
// Library class
class Library {
    #myLibrary;

    constructor() {
        // array of Book objects
        this.#myLibrary = [];
    }

    getLibrarySize() {
        return this.#myLibrary.length;
    }

    addToLibrary(book) {
        this.#myLibrary.push(book);
    }

    getBook(index) {
        return this.#myLibrary[index];
    }

    removeBook(index) {
        // removes from the DOM
        this.getBook(index).getBookContainer().remove();
        // removes from the library array
        this.#myLibrary.splice(index, 1);
    }
}

// creates a library
let library = new Library();

// elements already in the DOM  
let booksContainer = document.querySelector("#books-container");
let addBookButton = document.querySelector("#add-book");
let dialog = document.querySelector("dialog");

// event listeners for elements that gets created later  
document.addEventListener("click", function (event) {
    if (event.target.id === "submit-button") {
        submitHandler();
    } else if (event.target.className === "remove-button") {
        removeHandler(event);
    } else if (event.target.className === "read-button") {
        readButtonHandler(event);
    }
})

// event listener for the Add Book button  
addBookButton.addEventListener("click", addBookHandler);

// seperate function to handle the Add Book button  
function addBookHandler() {
    // shows the dialog  
    dialog.showModal();
    // prevents page refresh  
    document.querySelector("#add-book-form").addEventListener("submit", function (event) {
        event.preventDefault();
    })
}

// seperate function to handle the Submit button  
function submitHandler() {
    // gets the input values  
    let author = document.querySelector("#author-input").value;
    let title = document.querySelector("#title-input").value;
    let numOfPages = document.querySelector("#pages-input").value;
    let isRead = document.querySelector("#read-input").checked;
    // creates a new Book object and a container  
    let newBook = new Book(author, title, numOfPages, isRead);
    library.addToLibrary(newBook);
    let bookContainer = newBook.createContainer();
    // resets the form  
    document.querySelector("#add-book-form").reset();
    // closes the dialog and adds the book to the DOM  
    dialog.close();
    booksContainer.appendChild(bookContainer);
}
// seperate function to handle the Remove button  
function removeHandler(event) {
    // removes the book from the library  
    let bookContainerToRemove = event.target.parentElement;
    let indexToRemove;
    for (let i = 0; i < library.getLibrarySize(); i++) {
        if (library.getBook(i).getBookContainer() === bookContainerToRemove) {
            indexToRemove = i;
        }
    }
    library.removeBook(indexToRemove);
}
// seperate function to handle the Read/Not Read button  
function readButtonHandler(event) {
    let bookContainer = event.target.parentElement;
    for (let i = 0; i < library.getLibrarySize(); i++) {
        if (library.getBook(i).getBookContainer() === bookContainer) {
            if (event.target.textContent === "read") {
                library.getBook(i).isRead = false;
                event.target.textContent = "not read";
                event.target.style.backgroundColor = "rgb(224, 79, 99)";
            } else if (event.target.textContent === "not read") {
                library.getBook(i).isRead = true;
                event.target.textContent = "read";
                event.target.style.backgroundColor = "rgb(99, 218, 99)";
            }
        }
    }
}
