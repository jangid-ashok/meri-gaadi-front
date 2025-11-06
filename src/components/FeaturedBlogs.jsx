import BLOGS from "../assets/data/blogs.js";
const featuredPosts = BLOGS;

const FeaturedBlogs = () => {
    return (
		<section className="py-12 px-4 md:px-10">
			<h2 className="text-3xl font-bold mb-6 text-center">Featured Blogs</h2>
			<div className="flex space-x-6 overflow-x-auto scroll-smooth pb-4">
				{featuredPosts.map((post) => (
					<a href={`blog-info/${post.slug}`} key={post.id} className="min-w-[280px] md:min-w-[320px] flex-shrink-0 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:translate-y-1">
						<img src={post.image} alt={post.imageName} className="w-full h-48 object-cover rounded-t-2xl" />
						<div className="p-4">
							<h3 className="text-lg font-semibold">{post.title}</h3>
							<p className="text-gray-600 text-sm mt-1">{post.shortDescription}</p>
						</div>
					</a>
				))}
			</div>
		</section>
	);
}

export default FeaturedBlogs;