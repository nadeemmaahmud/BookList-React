import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react';

const NewBook = ({ api_url }) => {
    let [book, setBook] = useState({title:'', author:'', release_date:''})
    let [error, setError] = useState(null)

    const handleFormChange = (name, value) => {
        setBook((prev) => ({
            ...prev, [name]:value
        }))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        if (book.title.trim() === '') return setError('This field is required!')
        if (book.author.trim() === '') return setError('This field is required!')
        
        let res = await fetch(api_url, {
            method:"POST",
            headers:{ "Content-Type":"application/json"},
            body: JSON.stringify(book)
        })
        
        if (res.ok) {
            setBook({title:'', author:'', release_date:''})
        }
    }

    return (
        <div>
            <div className='min-h-screen py-12 px-8'>
                <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-8 mt-10">
                    <h1 className="text-3xl font-bold text-gray-800 text-center">➕ Add A New Book!</h1>
                    <hr className="my-4 border-gray-300" />
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            name="title"
                            value={book.title}
                            onChange={(e) => handleFormChange(e.target.name, e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Enter book title"
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        </div>
                        <div>
                        <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-1">
                            Author
                        </label>
                        <input
                            name="author"
                            value={book.author}
                            onChange={(e) => handleFormChange(e.target.name, e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Enter author name"
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        </div>
                        <div>
                        <label htmlFor="release_date" className="block text-sm font-semibold text-gray-700 mb-1">
                            Release Date
                        </label>
                        <input
                            name="release_date"
                            value={book.release_date}
                            onChange={(e) => handleFormChange(e.target.name, e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="date"
                        />
                        </div>
                        <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
                        >
                        <PlusCircle className="w-5 h-5" />
                        Add Book
                        </button>
                    </form>                        
                </div>
            </div>
        </div>
    );
};

export default NewBook;