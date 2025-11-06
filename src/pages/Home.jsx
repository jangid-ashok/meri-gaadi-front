import { Link } from "react-router-dom";
import HEADER_IMAGE from '../assets/images/car-01.jpg';
import blogs from '../assets/data/blogs.js';
import BlogCard from "../components/BlogCard";
import FeaturedBlogs from "../components/FeaturedBlogs.jsx";
import CATEGORIES from "../assets/data/categories.json";

const BlogCategories = CATEGORIES;


const Home = () => {
    return (
        // <div className="p-4 text-center">
        //     <h1 className="text-4xl font-bold text-gray-800">Welcome to Meri Gaadi</h1>
        //     <p className="text-gray-500 mt-2">Your go-to place for car reviews and news.</p>
        // </div>
        // <section className="py-16 px-10 bg-gradient-to-r from-blue-200 from-20% overflow-hidden relative w-full h-[500px]">

        //     <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 relative z-10">
        //         {/* Left Content */}
        //         <div className="md:w-1/2 text-left space-y-5 ">
        //             <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
        //                 Explore Cars Blogs, Reviews, & Latest News
        //             </h1>
        //             <p className="text-lg text-gray-600">Even a tiny thing matters in cars</p>
        //             <Link to="/blog-details" className="inline-block mt-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-medium hover:bg-blue-700 transition">
        //                 Read Blog
        //             </Link>
        //         </div>
        //         {/* Right Content */}
        //         <div className="md:w-1/2 h-full top-0 right-0 absolute">
        //             <img src={HEADER_IMAGE} className="w-full h-full object-cover" />
        //             <div className="w-full h-64 bg-blue-100 rounded-xl flex items-center justify-center"></div>
        //         </div>
        //     </div>
        // </section>
        <>
            <section className="relative h-[550px] flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <img src={HEADER_IMAGE} alt="header-image" className="w-full h-full object-cover brightness-75" />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-500 via-gray/80"></div>
                </div>

                {/* Foreground Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                    <div className="md:w-1/2 space-y-6">
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                            Explore <span className="text-blue-600">Car Blogs</span>
                        </h1>
                        <p className="text-lg text-gray-700">
                            Trusted insights on SUVs, Sedans, Electric Vehicles & more.
                        </p>
                        <Link to="/blogs" className="inline-block px-5 py-2 bg-blue-600 text-white rounded-full text-lg font-medium hover:bg-blue-700 transition">
                            Explore More
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-10 px-4 md:px-10">
                <h2 className="text-3xl font-bold mb-6 text-center">Popular Categories</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {Object.entries(BlogCategories).map(([category, categoryObj]) => (
                        <a className="inline-block px-4 py-2 text-sm rounded-full border bg-gray-200 border-gray-300 hover:bg-gray-400 text-gray-700 transition-all duration-200" href={'blog-category/' + category}>{categoryObj.name}</a>
                    ))}
                </div>
            </section>

            <section className="py-6 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Latest Blog Posts</h2>
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {blogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                </div>
            </section>
            <FeaturedBlogs />
        </>
    );
};

export default Home;