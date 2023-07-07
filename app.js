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
    let myLibraryJSONString = JSON.stringify(myLibrary);
    localStorage.setItem("Library", myLibraryJSONString);
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

const deleteTable = function(){
  const table = document.querySelector('.my-table');
    const rows = table.rows;
    // Start from the last row and remove all rows except the first one
    for (let i = rows.length - 1; i > 0; i--) {
      table.deleteRow(i);
    }
}

function removeBookByBookName(bookName) {
    for (var i = 0; i < myLibrary.length; i++) {
      if (myLibrary[i].bookName === bookName) {
        myLibrary.splice(i, 1); // Remove 1 element at index i
        let myLibraryJSONString = JSON.stringify(myLibrary);
        localStorage.setItem("Library", myLibraryJSONString);
        break; // Exit the loop once the book is found and removed
      }
    }

}
function displayTable(library){
    const table = document.querySelector('.my-table tbody');
    const firstRow = table.querySelector('tr:first-child'); // Get the first row of the table

    console.log(library);
    if(library === null){
        return;
    }
    library.forEach(book => {
      var rowTemplate = document.getElementById('table-row');
      var rowTemplateCopy = document.importNode(rowTemplate.content, true);
      rowTemplateCopy.querySelector('#book-name').textContent = book.bookName;
      rowTemplateCopy.querySelector('#book-author').textContent = book.author;
      rowTemplateCopy.querySelector('#book-pages').textContent = book.pages;
      switch (book.status) {
        case 'read':
          rowTemplateCopy.querySelector('#read').setAttribute('selected', 'true');
          break;
        case 'unread':
          rowTemplateCopy.querySelector('#unread').setAttribute('selected', 'true');
          break;
        case 'reading':
          rowTemplateCopy.querySelector('#reading').setAttribute('selected', 'true');
          break;
        default:
          rowTemplateCopy.querySelector('#read').setAttribute('selected', 'true');
          break;
      }

      const deleteBtn = rowTemplateCopy.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function(){
            let bookName = deleteBtn.parentNode.parentNode.firstElementChild.textContent;
            removeBookByBookName(bookName);
            deleteBtn.parentNode.parentNode.parentNode.removeChild(deleteBtn.parentNode.parentNode);
            
        });

      table.insertBefore(rowTemplateCopy, firstRow.nextSibling);

    });
}

let newMyLibrary = JSON.parse(localStorage.getItem("Library"));
console.log(newMyLibrary);
displayTable(newMyLibrary);

submitBtn.addEventListener('click', function(){
    event.preventDefault(); // Prevents the default form submission behavior
    if(book.value !== '' && author.value !== '' && pages.value !== ''){
        let books = new Book(book.value, author.value, pages.value, status.value);
        books.addBookToLibrary();
        clearInputValues();
        deleteTable();
        displayTable(myLibrary);
    }else{

    }
});

