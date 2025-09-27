import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { PlusCircle } from 'lucide-react';

const EditBook = ({ api_url }) => {
    let { id } = useParams()
    let navigate = useNavigate()
    let [book, setBook] = useState({title:'', author:'', release_date:''})
    let [error, setError] = useState(null)

    useEffect(() => {
        const fetchBook = async () => {
            try {
                let res = await fetch(`${api_url}${id}`)
                let data = await res.json()
                setBook(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBook()
    }, [id, api_url])

    const handleFormChange = (name, value) => {
        setBook({...book, [name]:value})
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        
        if (book.title.trim() === '') return setError('This field is required!')
        if (book.author.trim() === '') return setError('This field is required!')

        try {
            let res = await fetch(`${api_url}${id}`, {
                method: "PUT",
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(book)
            })
            if (res.ok) {
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
      <div className="min-h-screen py-12 px-8">
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-8 mt-10">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            ✏️ Edit A Book!
          </h1>
          <hr className="my-4 border-gray-300" />
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                name="title"
                value={book.title}
                onChange={(e) =>
                  handleFormChange(e.target.name, e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter book title"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div>
              <label
                htmlFor="author"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Author
              </label>
              <input
                name="author"
                value={book.author}
                onChange={(e) =>
                  handleFormChange(e.target.name, e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter author name"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
            <div>
              <label
                htmlFor="release_date"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Release Date
              </label>
              <input
                name="release_date"
                value={book.release_date}
                onChange={(e) =>
                  handleFormChange(e.target.name, e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="date"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
            >
              <PlusCircle className="w-5 h-5" />
              Edit Book
            </button>
          </form>
        </div>
      </div>
    );
};

export default EditBook;