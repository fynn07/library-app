
const library_array = [];
const library = document.querySelector('#library');

function Book(book_name, author_name, no_of_pages, date_published){
    this.book_name = book_name;
    this.author_name = author_name;
    this.no_of_pages = no_of_pages;
    this.date_published = date_published;
}

Book.prototype.getIndex = function() {
    for(i = 0; i < library_array.length; i++){
        if(this === library_array[i]){
            return i+1;
        }
    }
}

function clearLibrary(){
    for(i = 1; i < library_array.length ; i++){
        library.deleteRow(1);
    }
}

function updateRowIndexes(){
    lib = library.childNodes;
    for(i = 1; i < lib.length; i++){
        lib[i].setAttribute('id', i-1);
    }
}

function updatePageLibrary(){
    clearLibrary();
    library_array.forEach((e) => {
        const new_row = document.createElement('tr');
        new_row.setAttribute('id', e.getIndex());
        for(i = 0; i < 6; i++){
            const new_data = document.createElement('td');
            if(i === 0){
                new_data.textContent = e.book_name;
            }
            if(i === 1){
                new_data.textContent = e.author_name;
            }
            if(i === 2){
                new_data.textContent = e.no_of_pages;
            }
            if(i === 3){
                new_data.textContent = e.date_published;
            }
            if(i === 4){
                const hasRead = document.createElement('input');
                hasRead.setAttribute('type', 'checkbox');
                new_data.appendChild(hasRead);
            }
            if(i === 5){
                const willRemove = document.createElement('button');
                willRemove.addEventListener('click', (e) => {
                    library_array.splice(new_row.id-1, 1);
                    e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
                    updateRowIndexes();
                    console.log(new_row.id);
                })
                willRemove.textContent = 'X';
                new_data.appendChild(willRemove);
            }
            new_row.appendChild(new_data);
        }
        library.appendChild(new_row);
    })
}

function addBooktoLibrary(){
    const bookName = document.querySelector('#book-name-info').value || 'NA';
    const bookAuthor = document.querySelector('#book-author-info').value || 'NA';
    const bookPages = document.querySelector('#book-pages-info').value || 'NA';
    const bookDate = document.querySelector('#book-date-info').value || 'NA';
    const book = new Book(bookName, bookAuthor, bookPages, bookDate);
    library_array.push(book);
    updatePageLibrary();
}

function initialBooks(){
    const book = new Book('The Witcher', 'Andrzej Sapkowski', 341, '01/23/98');
    const book2 = new Book('Harry Potter', 'J.K Rowling', 584, '03/21/92');
    library_array.push(book);
    updatePageLibrary();
    library_array.push(book2);
    updatePageLibrary();
}

initialBooks();