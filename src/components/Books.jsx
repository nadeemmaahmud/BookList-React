import React, { useEffect, useState } from 'react';
import {Edit, Trash2} from 'lucide-react'
import { NavLink } from 'react-router';
import Navbar from './Navbar';

const Books = ({ api_url }) => {
    let [books, setBooks] = useState([])

    const getBooks = async () => {
        try {
            let res = await fetch(api_url)
            let data = await res.json()
            
            setBooks(data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteBook = async (id) => {
        let confirmDelete = window.confirm('Are you sure to delete the book?')
        if (!confirmDelete) return

        try {
            await fetch(`${api_url}${id}`, {
                method: "DELETE",
            })
            setBooks(books.filter((book) => book.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBooks()
    }, [])

    return (
        <div>
            <Navbar/>
            <div className='min-h-screen py-12 px-8'>
                <div className='max-w-3xl mx-auto'>
                    <div className='text-center mb-10'>
                        <h1 className='text-4xl font-bold text-white'>Book List</h1>
                        <p className='mt-2 font-bold'>Search and review for your desired books</p>
                    </div>
                    <hr className='border-white mb-8'/>
                    <div className='space-y-4'>
                        {books.map((book) => {
                            return (
                                <div key={ book.id } className='flex justify-between items-center bg-white shadow-lg shadow-amber-500 rounded-xl p-4 hover:shadow-md transition'>
                                    <div>
                                        <p className='text-lg font-semibold text-gray-800'>{ book.title }</p>
                                        <p className='text-sm text-gray-500'>{ book.author } . { book.release_date }</p>
                                    </div>
                                    <div className='flex gap-3'>
                                        <NavLink to={`/edit/${book.id}`}><button className='p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition'><Edit/></button></NavLink>
                                        <button className='p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition' onClick={() => deleteBook(book.id)}><Trash2/></button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Books;