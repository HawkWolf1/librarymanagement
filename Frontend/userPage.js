async function showAvailableBooks() {
    try {
        const response = await axios.get('http://localhost:5500/getBooksForRent');

        if (response.status === 200) {
            const books = response.data;
            const booksContainer = document.getElementById('booksContainer');
            booksContainer.innerHTML = '';

            books.forEach(book => {
                const bookContainer = document.createElement('div');

         
                const bookDetails = document.createElement('span');
                bookDetails.textContent = `${book.bookName} by ${book.author}`;
                bookContainer.appendChild(bookDetails);
                console.log(bookDetails.textContent)

                const rentLabel = document.createElement('label');
                rentLabel.textContent = 'Select for Rent';
                bookContainer.appendChild(rentLabel);

           
                const rentCheckbox = document.createElement('input');
                rentCheckbox.type = 'checkbox';
                rentCheckbox.name = 'rentBook';
                rentCheckbox.value = `${book.bookId}`; 
                bookContainer.appendChild(rentCheckbox);

                const quantityLabel = document.createElement('label');
                quantityLabel.textContent = 'Select Quantity';
                bookContainer.appendChild(quantityLabel);

                const numberOfBooksInput = document.createElement('input');
                numberOfBooksInput.type = 'number';
                numberOfBooksInput.name = 'numberOfBooks';
                numberOfBooksInput.min = '0';
                numberOfBooksInput.max = '5';
                bookContainer.appendChild(numberOfBooksInput);

                booksContainer.appendChild(bookContainer);
            })

            const rentButton = document.createElement('button');
            rentButton.textContent = 'Rent Selected Books';
            rentButton.onclick = rentSelectedBooks; 
            booksContainer.appendChild(rentButton);

        } else {
            alert('Failed to fetch books. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching books.');
    }
}


async function rentSelectedBooks() {
    const checkboxes = document.getElementsByName('rentBook');
    const selectedBooks = [];
    const token = localStorage.getItem('token')

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const bookId = checkbox.value;
            const quantityInput = checkbox.nextElementSibling.nextElementSibling;

            const bookContainer = checkbox.closest('div');

            const bookName = bookContainer.querySelector('span').textContent.trim();
            const quantity = quantityInput.value;

            selectedBooks.push({ bookName, quantity });
        }
    });

    if (selectedBooks.length > 0) {
        try {
            const response = await axios.post('http://localhost:5500/rentSelectedBooks', selectedBooks, {headers: {'Authorization' : token}});

            if (response.status === 200) {
                alert('Books rented successfully!');
            } else {
                alert('Failed to rent books. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while renting books.');
        }
    } else {
        alert('No books selected for rent.');
    }
}


async function showRentedBooks() {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:5500/getRentedBooks', {
            headers: { 'Authorization': token }
        });

        if (response.status === 200) {
            const rentedBooks = response.data;
            const rentedBooksContainer = document.getElementById('rentedBooksContainer');
            rentedBooksContainer.innerHTML = '';

            rentedBooks.forEach(book => {
                const bookContainer = document.createElement('div');

                const rentedDate = new Date(book.rentedDate);
                const formattedDate = rentedDate.toLocaleDateString()
          
                const bookDetails = document.createElement('span');
                bookDetails.textContent = `${book.bookName} (Quantity: ${book.quantity},Rented Date: ${formattedDate})`;
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



