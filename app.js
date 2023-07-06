let myLibrary = [];

class Book {
  constructor(bookName, author, pages, status) {
    this.bookName = bookName;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }

  addBookToLibrary() {
    myLibrary.push(this);
  }
}

const book = document.querySelector('#book');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const status = document.querySelector('#status');
const submitBtn = document.querySelector('.submitBtn');

const clearInputValues = function(){
    book.value = '';
    author.value = '';
    pages.value = '';
    status.selectedIndex = 0;
}

const displayTable = function(){
    const table = document.querySelector('.my-table');
    const rows = table.rows;

    // Start from the last row and remove all rows except the first one
    for (let i = rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
    }
}

submitBtn.addEventListener('click', function(){
    event.preventDefault(); // Prevents the default form submission behavior
    if(book.value !== '' && author.value !== '' && pages.value !== ''){
        let books = new Book(book.value, author.valxue, pages.value, status.value);
        books.addBookToLibrary();
        clearInputValues();
        displayTable();
        console.log(myLibrary);
    }else{

    }
})
