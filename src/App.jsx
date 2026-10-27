import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import Blogs from './components/Blogs'
import BlogInfo from './components/BlogInfo'
import Categories from './components/Categories'
import CarsPage from './pages/CarsPage'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <Navbar />
      <main className="flex-1 w-full bg-transparent">
        <Routes>
          {/* Set heroLayout to "split" to switch from overlay to the side-by-side hero. */}
          <Route path="/" element={<HomePage heroLayout="overlay" />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/blog-info/:slug" element={<BlogInfo />} />
          <Route path="/demo" element={<HomePage heroLayout="overlay" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
