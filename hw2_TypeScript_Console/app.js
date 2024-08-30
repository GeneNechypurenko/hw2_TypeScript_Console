// 2. Create LibraryBook class implementing Book interface
class LibraryBook {
    constructor(title, author, publishedYear, genre) {
        this.title = title;
        this.author = author;
        this.publishedYear = publishedYear;
        this.genre = genre;
        this.isAvailable = true; // By default, the book is available
    }
    borrowBook() {
        if (this.isAvailable) {
            this.isAvailable = false;
            console.log(`The book "${this.title}" has been borrowed.`);
        }
        else {
            console.log(`The book "${this.title}" is not available.`);
        }
    }
    returnBook() {
        this.isAvailable = true;
        console.log(`The book "${this.title}" has been returned.`);
    }
}
// 4. Create LibraryUser class implementing User interface
class LibraryUser {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.borrowedBooks = [];
    }
    borrow(book) {
        if (book.isAvailable) {
            book.borrowBook();
            this.borrowedBooks.push(book);
        }
        else {
            console.log(`Sorry, ${this.name}. The book "${book.title}" is already borrowed.`);
        }
    }
    return(book) {
        const index = this.borrowedBooks.indexOf(book);
        if (index !== -1) {
            book.returnBook();
            this.borrowedBooks.splice(index, 1);
        }
        else {
            console.log(`${this.name} does not have the book "${book.title}".`);
        }
    }
}
// 5. Create Library class
class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }
    addBook(book) {
        this.books.push(book);
        console.log(`The book "${book.title}" has been added to the library.`);
    }
    registerUser(user) {
        this.users.push(user);
        console.log(`The user "${user.name}" has been registered.`);
    }
    findBooksByAuthor(author) {
        return this.books.filter(book => book.author === author);
    }
    findAvailableBooks() {
        return this.books.filter(book => book.isAvailable);
    }
}
// 6. TESTING:
// Create library instance
const library = new Library();
// Create books and add them to the library
const book1 = new LibraryBook('1984', 'George Orwell', 1949, 'Dystopian');
const book2 = new LibraryBook('To Kill a Mockingbird', 'Harper Lee', 1960, 'Fiction');
const book3 = new LibraryBook('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'Classic');
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);
// Register users
const user1 = new LibraryUser(1, 'Alice');
const user2 = new LibraryUser(2, 'Bob');
library.registerUser(user1);
library.registerUser(user2);
// Users borrow and return books
user1.borrow(book1);
user2.borrow(book2);
user1.return(book1);
user2.borrow(book1); // Bob tries to borrow "1984" after Alice returns it
// Find books by author
const orwellBooks = library.findBooksByAuthor('George Orwell');
console.log('Books by George Orwell:', orwellBooks);
// List all available books
const availableBooks = library.findAvailableBooks();
console.log('Available books:', availableBooks);
//# sourceMappingURL=app.js.map