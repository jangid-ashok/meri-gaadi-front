import BLOGS from '../assets/data/blogs.js';
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import parse from 'html-react-parser';

const BlogInfo = (blogID) => {
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    return (
        <div className="container mx-auto px-2 py-8 grid grid-cols-1 lg:grid-cols-1 gap-8">
            {/* Blog main content */}
            <motion.div className="col-span-2" initial={{opacity: 0, y: 20 }} animate={{opacity: 1, y: 0}} transtition={{duration: 0.5}}>
                <h1 className="text-3xl lg:text-4xl font-bold mt-2 mb-2 leading-tight text-gray-900 text-left">{BLOGS[0].title}</h1>
                <h5 className="text-md text-gray-500 mb-8 text-left">Published on: {new Date(BLOGS[0].publishedDate).toDateString()}</h5>
                <img src={window.location.origin + '/' + BLOGS[0].image} className="w-full h-screen object-cover rounded-lg shadow-md" />
                <p className="text-sm text-gray-500 mb-4">{BLOGS[0].subtitle}</p>
                <p className="text-sm text-gray-500 mb-4">Author Name:</p>

                <div className="prose max-w-full mx-auto px-4 py-8 text-justifytext-lg text-gray-700 mb-4 bg-slate-100 text-left">
                    {parse(BLOGS[0].description)}
                </div>
            </motion.div>
        </div>
    );
}

export default BlogInfo;