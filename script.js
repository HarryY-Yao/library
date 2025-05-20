const myLibrary = [];
const libContent =  document.querySelector(".library");

const addButton = document.querySelector(".add");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleReadStatus = function() {
    if (this.read) {
        this.read = null;
    } else {
        this.read = true;
    }
};

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayLibrary() {
    for (const book of myLibrary) {
        let newCard = document.createElement("div");
        newCard.classList.add('card');
        newCard.setAttribute("data-id", book.id);

        let coverContainer = document.createElement("div");
        coverContainer.classList.add('img');
        
        let cover = document.createElement("img");
        cover.classList.add("book-img")
        cover.setAttribute("src", "book.svg");
        cover.setAttribute("alt", "cover");

        let bookInfo = document.createElement("div");
        bookInfo.classList.add('info');


        let bookTitle = document.createElement("p");
        bookTitle.innerText = book.title;

        let bookAuthor = document.createElement("p");
        bookAuthor.innerText = `By ${book.author}`;

        let bookPages = document.createElement("p");
        bookPages.innerText = `${book.pages} pages`;

        let bookReadStatus = document.createElement("p");
        book.read != null ? bookReadStatus.innerText = "Read" : bookReadStatus.innerText = "Not yet read";
        
        let buttonContainer = document.createElement("p");
        let rmvBtn = document.createElement("button");
        let toggleBtn = document.createElement("button");
        
        buttonContainer.classList.add("button-container");
        rmvBtn.classList.add("rmv");
        toggleBtn.classList.add("toggle");

        rmvBtn.addEventListener("click", () => {
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].id === book.id) {
                    myLibrary.splice(i, 1);
                }
            }

            clearLibrary();
            displayLibrary();
        })

        toggleBtn.addEventListener("click", () => {
            book.toggleReadStatus();

            clearLibrary();
            displayLibrary();
        })
        
        rmvBtn.innerText = "x"
        toggleBtn.innerText = "Toggle Read Status";

        buttonContainer.appendChild(rmvBtn);
        buttonContainer.appendChild(toggleBtn);

        newCard.appendChild(coverContainer);
        coverContainer.appendChild(cover);
        
        newCard.appendChild(bookInfo);
        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookPages);
        bookInfo.appendChild(bookReadStatus);
        bookInfo.appendChild(buttonContainer);

        libContent.appendChild(newCard);
    }
}


function clearLibrary() {
    while (libContent.firstChild) {
        libContent.removeChild(libContent.firstChild);
    }
}



addButton.addEventListener("click", (event) => {
    if (titleInput.value && authorInput.value && pagesInput.value && Number(pagesInput.value) >= 1) {
        if (readInput.checked) {
            addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.value);
        } else {
            addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, null);
        }


        // ensure no duplicates added
        clearLibrary();

        displayLibrary();
        event.preventDefault();
    }
})


