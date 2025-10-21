import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const Admin = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'news'), {
        title,
        description,
        image,
        category,
        author,
        createdAt: new Date(),
      });
      console.log('Document written with ID: ', docRef.id);
      setTitle('');
      setDescription('');
      setImage('');
      setCategory('');
      setAuthor('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border rounded-lg"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image URL</label>
          <input type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
          <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 font-bold mb-2">Author</label>
          <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Create News</button>
      </form>
    </div>
  );
};

export default Admin;