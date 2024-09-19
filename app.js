const express = require('express');
const app = express();
app.use(express.json()); 


const bookList = [
    { id: 1, title: 'The Catcher in the Rye', author: 'J.D. Salinger', isbn: '9780316769488', review: 'A classic coming-of-age novel.' },
    { id: 2, title: 'Pride and Prejudice', author: 'Jane Austen', isbn: '9780679783268', review: 'A brilliant romantic novel with sharp social commentary.' },
    { id: 3, title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '9780547928227', review: 'An epic fantasy adventure set in Middle-earth.' },
    { id: 4, title: 'Sense and Sensibility', author: 'Jane Austen', isbn: '9780141439662', review: 'A poignant novel about love, relationships, and societal expectations.' }
];


const findBooksByTitle = (title) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const books = bookList.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
            if (books.length > 0) {
                resolve(books);
            } else {
                reject(new Error('No books found with this title'));
            }
        }, 1000); 
    });
};


app.get('/books/title/:title', (req, res) => {
    const { title } = req.params;

    findBooksByTitle(title)
        .then(books => {
            res.json(books);
        })
        .catch(error => {
            res.status(404).json({ message: error.message });
        });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
