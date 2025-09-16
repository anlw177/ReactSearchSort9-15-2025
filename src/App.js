import React, { useState, useEffect } from 'react';
import './App.css';

//using some books I like as test data
const booksList = [
  { name: "Insignia", genre: "Science Fiction", id: 1 },
  { name: "A Face Like Glass", genre: "Fantasy", id: 2 },
  { name: "Never Let Me Go", genre: "Science Fiction", id: 3 },
  { name: "Omelas", genre: "Dystopian Fiction", id: 4 },
  { name: "Sorrows of Satan", genre: "Classic Fiction", id: 5 },
  { name: "The Hitchhiker's Guide to the Galaxy", genre: "Science Fiction", id: 6 },
  { name: "Diabolic", genre: "Science Fiction", id: 7 }
];


const title = "Search Books";




const Books = ({ books }) => {
  if (books.length === 0) {
    return <div className="text-center mt-4">no results :c. reminder: case sensitive</div>;
  }

  return (
    <ul>
      {books.map(book => (
        <li key={book.id}>
          <p>{book.name}</p>
          <p>Genre: {book.genre}</p>
        </li>
      ))}
    </ul>
  );
};


const SearchSort = ({ booksList }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredBooks, setFilteredBooks] = useState(booksList);
    const [currentSort, setCurrentSort] = useState(null); 

    useEffect(() => {
        
        let updatedBooks = [...booksList];

        
        if (searchTerm.length >= 2) {
            updatedBooks = updatedBooks.filter(book =>
                book.genre.includes(searchTerm)
            );
        }

        
        if (currentSort === 'atoz') {
            updatedBooks.sort((a, b) => a.name.localeCompare(b.name));
        } else if (currentSort === 'ztoa') {
            updatedBooks.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredBooks(updatedBooks);

    }, [searchTerm, currentSort, booksList]);

    const onSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const sortAtoZ = () => {
        setCurrentSort('atoz');
    };

    const sortZtoA = () => {
        setCurrentSort('ztoa');
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <input
                    type="text"
                    placeholder="Search by genre..."
                    value={searchTerm}
                    onChange={onSearchChange}
                    className="w-full sm:w-80 px-4 py-2 text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <button
                    onClick={sortAtoZ}
                    className="w-full sm:w-auto px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                >
                    Sort A to Z
                </button>
                <button
                    onClick={sortZtoA}
                    className="w-full sm:w-auto px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
                >
                    Sort Z to A
                </button>
            </div>
            <Books books={filteredBooks} />
        </div>
    );
};


function App() {
  return (
    <div className="App">
      <h8k-navbar header ={title}></h8k-navbar>
      <SearchSort booksList={booksList}/>
		</div>
  );
};

export default App;
