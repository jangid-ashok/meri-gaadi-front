import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Blogs from './components/Blogs'
import BlogInfo from './components/BlogInfo'
import Categories from './components/Categories'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <Navbar />
      <main className="flex-1 w-full bg-transparent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/blog-info/:slug" element={<BlogInfo />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
