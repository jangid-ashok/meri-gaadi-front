import BLOGS from "../assets/data/blogs";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const categories = ['All', 'SUV', 'EV', 'Sedan', 'Hatchback']
const authors = ['All', 'John Doe', 'Jane Smith']

const Blogs = () => {
    const [search, setSearch] = useState('');
    const [selectCategory, setSelectCategory] = useState('All');
    const [selectAuthor, setSelectAuthor] = useState('All');

    const filteredBlogs = BLOGS.filter((blog) => {
        const matchedSearch = blog.title.toLowerCase().includes(search.toLowerCase()) || blog.shortDescription.toLowerCase().includes(search.toLowerCase());
    });
    /* return (
        <section className="py-10 px-4 md:px-12">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">Blogs</h2>
                <div className="space-y-8">
                    {BLOGS.map((blog) => (
                        <div className="flex flex-col md:flex-row items-start md:items-centergap-4 md:gap-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4">
                            <img src={window.location.origin + '/' + blog.image} alt={blog.image} className="w-full md:w-48 h-40 object-cover rounded-xl transition-all" />
                            <div className="flex-1">
                                <div className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition">
                                    {blog.title}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                    {blog.shorDescription}
                                </p>
                                <div className="text-sm text-gray-500 mt-2">
                                    By <span className="font-medium">{blog.author}</span> •{' '}{new Date(blog.publishedDate).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    ); */

    return (
        <div className="min-h-screen px-4 py-10 md:px-10">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
                {/* SideBar Filters */}
                <aside className="md:col-span-1 space-y-6 bg-slate-100 px-3 py-4 rounded-xl">
                    <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
                    <div>
                        <label className="block text-sm font-medium mb-1">Search</label>
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search By Title or Subtitle" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select value={selectCategory} onChange={(e) => setSelectCategory(e.target.value)} className="w-full border rounded-lg px-3 py-2">
                            {categories.map((category) => (
                                <option key={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </aside>
                {/* Blog List */}
                <main className="md:col-span-3 space-y-8 bg-slate-100 px-4 py-4 rounded-xl">
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">
                        Blogs
                    </h1>
                    {BLOGS.map((blog) => (
                        <Link to={window.location.origin + `/blog-info/${blog.slug}`}>
                            <div className="flex flex-col md:flex-row items-start md:items-start gap-4 md:gap-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-4">
                                <img src={window.location.origin + '/' + blog.image} className="w-full md:w-56 h-40 object-cover rounded-lg" />
                                <div className="md:ml-6 mt-4 md:mt-0 flex-1 text-left">
                                    <div className="text-sm text-gray-500 mb-2">
                                        Published On {new Date(blog.publishedDate).toDateString()}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">{blog.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{blog.shorDescription}</p>
                                    <div className="text-sm text-gray-500 mt-2">
                                        <span className="font-medium">{blog.author}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </main>
            </div>
        </div>
    );
}

export default Blogs;