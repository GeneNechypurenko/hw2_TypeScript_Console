// 1. Create Book interface
interface Book {
    title: string;
    author: string;
    publishedYear: number;
    genre: string;
    isAvailable: boolean;
}

// 2. Create LibraryBook class implementing Book interface
class LibraryBook implements Book {
    title: string;
    author: string;
    publishedYear: number;
    genre: string;
    isAvailable: boolean;

    constructor(title: string, author: string, publishedYear: number, genre: string) {
        this.title = title;
        this.author = author;
        this.publishedYear = publishedYear;
        this.genre = genre;
        this.isAvailable = true;
    }

    borrowBook(): void {
        if (this.isAvailable) {
            this.isAvailable = false;
            console.log(`The book "${this.title}" has been borrowed.`);
        } else {
            console.log(`The book "${this.title}" is not available.`);
        }
    }

    returnBook(): void {
        this.isAvailable = true;
        console.log(`The book "${this.title}" has been returned.`);
    }
}

// 3. Create User interface
interface User {
    id: number;
    name: string;
    borrowedBooks: Book[];
}

// 4. Create LibraryUser class implementing User interface
class LibraryUser implements User {
    id: number;
    name: string;
    borrowedBooks: Book[];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.borrowedBooks = [];
    }

    borrow(book: LibraryBook): void {
        if (book.isAvailable) {
            book.borrowBook();
            this.borrowedBooks.push(book);
        } else {
            console.log(`Sorry, ${this.name}. The book "${book.title}" is already borrowed.`);
        }
    }

    return(book: LibraryBook): void {
        const index = this.borrowedBooks.indexOf(book);
        if (index !== -1) {
            book.returnBook();
            this.borrowedBooks.splice(index, 1);
        } else {
            console.log(`${this.name} does not have the book "${book.title}".`);
        }
    }
}

// 5. Create Library class
class Library {
    books: LibraryBook[];
    users: LibraryUser[];

    constructor() {
        this.books = [];
        this.users = [];
    }

    addBook(book: LibraryBook): void {
        this.books.push(book);
        console.log(`The book "${book.title}" has been added to the library.`);
    }

    registerUser(user: LibraryUser): void {
        this.users.push(user);
        console.log(`The user "${user.name}" has been registered.`);
    }

    findBooksByAuthor(author: string): LibraryBook[] {
        return this.books.filter(book => book.author === author);
    }

    findAvailableBooks(): LibraryBook[] {
        return this.books.filter(book => book.isAvailable);
    }
}

// 6. TESTING:

const library = new Library();

const book1 = new LibraryBook('1984', 'George Orwell', 1949, 'Dystopian');
const book2 = new LibraryBook('To Kill a Mockingbird', 'Harper Lee', 1960, 'Fiction');
const book3 = new LibraryBook('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'Classic');

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

const user1 = new LibraryUser(1, 'Alice');
const user2 = new LibraryUser(2, 'Bob');

library.registerUser(user1);
library.registerUser(user2);

user1.borrow(book1);
user2.borrow(book2);
user1.return(book1);
user2.borrow(book1);

const orwellBooks = library.findBooksByAuthor('George Orwell');
console.log('Books by George Orwell:', orwellBooks);

const availableBooks = library.findAvailableBooks();
console.log('Available books:', availableBooks);
