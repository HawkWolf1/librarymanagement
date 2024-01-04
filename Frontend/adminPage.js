async function addBook() {
    const bookName = document.getElementById('bookName').value;
    const author = document.getElementById('author').value;

    
    const token = localStorage.getItem('token')

    if (bookName && author) {
        const bookData = { 
            bookName, 
            author 
        };

        try {
            const response = await axios.post('http://localhost:5500/addBook', bookData, {headers: {'Authorization' : token}});

            if (response.status===201) {
                document.getElementById('bookName').value = '';
                document.getElementById('author').value = '';
                alert('Book added successfully!');
            } else {
                alert('Failed to add book. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the book.');
        }
    } else {
        alert('Please enter both: book name and author.');
    }
}




async function displayBooks() {
    try {
      const response = await axios.get('http://localhost:5500/getBooks');
  
      if (response.status === 200) {
        const books = response.data;
        const booksContainer = document.getElementById('booksContainer');
        booksContainer.innerHTML = '';
  
        books.forEach(book => {
          const listItem = document.createElement('li');
          listItem.textContent = `${book.bookName} by ${book.author}`;
          booksContainer.appendChild(listItem);
        });
      } else {
        alert('Failed to fetch books. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching books.');
    }
  }



  
  async function displayRentedBooks() {
    try {
      const response = await axios.get('http://localhost:5500/displayRentedBooks');
  
      if (response.status === 200) {
        const rentedBooks = response.data;
        const rentedBooksContainer = document.getElementById('rentedBooksContainer');
        rentedBooksContainer.innerHTML = '';
  
        rentedBooks.forEach(book => {
          const bookContainer = document.createElement('div');
  
          const rentedDate = new Date(book.rentedDate).toLocaleDateString();
  
          const bookDetails = document.createElement('li');
          bookDetails.textContent = `Book: ${book.bookName}, Quantity: ${book.quantity}, Rented By: ${book.personRented}, Rented Date: ${rentedDate}`;
          bookContainer.appendChild(bookDetails);
  
          rentedBooksContainer.appendChild(bookContainer);
        });
      } else {
        alert('Failed to fetch rented books. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching rented books.');
    }
  }
  