import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Blogs from './components/Blogs'
import BlogInfo from './components/BlogInfo'
import Categories from './components/Categories'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/blog-info/:slug" element={<BlogInfo />} />
      </Routes>
    </>
  );
}

export default App
