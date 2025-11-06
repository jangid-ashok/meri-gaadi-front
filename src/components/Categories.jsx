import { Link } from "react-router-dom";
import CATEGORIES from '../assets/data/categories.json';

const assetsPath = window.location.origin + '/src/assets/images/categories/';

const BlogCategories = CATEGORIES;

const Categories = () => {
    return (
        <section className="py-10 px-4 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Popular Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {Object.entries(BlogCategories).map(([category, categoryObj]) => (
                    <Link to={`/blogs?category=${category}`} key={category} className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                        <img src={assetsPath + categoryObj.image} alt={categoryObj.name} className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition duration-300 flex items-center justify-center">
                            <h3 className="text-white text-3xl font-extralight">{categoryObj.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default Categories;