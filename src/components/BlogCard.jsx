import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    return (
        <div className="bg-white shadow-md rounded-xl overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
            <Link to={`blog-info/${blog.slug}`}>
            <img src={blog.image} alt={blog.image_name} className="w-full h-48 object-cover" />
            <div className="p-4 space-y-2">
                <span className="inline-block text-sm text-blue-600 font-semibold uppercase tracking-wide">
                    {blog.category}
                </span>
                <h2 className="text-lg font-bold text-gray-800">{blog.title}</h2>
                <p className="text-sm text-gray-600">{blog.shorDescription }</p>
            </div>
            </Link>
        </div>
    );
}

export default BlogCard;