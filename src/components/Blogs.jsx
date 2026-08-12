import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import BLOGS from "../assets/data/blogs";

const getDescription = (blog) => blog.shorDescription || blog.shortDescription || "";
const getImageSrc = (image) =>
    image?.startsWith("http") ? image : `${window.location.origin}/${image.replace(/^\//, "")}`;

const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

const Blogs = () => {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(BLOGS.map((blog) => blog.category).filter(Boolean))];
        return ["All", ...uniqueCategories];
    }, []);

    const normalizedBlogs = useMemo(
        () =>
            BLOGS.map((blog) => ({
                ...blog,
                descriptionPreview: getDescription(blog),
            })),
        []
    );

    const filteredBlogs = useMemo(() => {
        return normalizedBlogs.filter((blog) => {
            const searchValue = search.trim().toLowerCase();
            const matchesSearch =
                searchValue.length === 0 ||
                blog.title.toLowerCase().includes(searchValue) ||
                blog.descriptionPreview.toLowerCase().includes(searchValue) ||
                blog.author.toLowerCase().includes(searchValue);

            const matchesCategory =
                selectedCategory === "All" || blog.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [normalizedBlogs, search, selectedCategory]);

    const featuredBlog = filteredBlogs[0];
    const secondaryBlogs = filteredBlogs.slice(1, 4);
    const archiveBlogs = filteredBlogs.slice(4);

    return (
        <section className="px-4 py-6 md:px-8 md:py-10">
            <div className="mx-auto max-w-7xl">
                <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white shadow-[0_30px_80px_rgba(15,23,42,0.22)]">
                    <div className="grid gap-8 px-6 py-10 md:grid-cols-[1.35fr_0.65fr] md:px-10 md:py-12">
                        <div className="space-y-6">
                            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-100">
                                Meri Gaadi Journal
                            </span>
                            <div className="max-w-2xl space-y-4">
                                <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                                    A cleaner, more editorial home for car reviews, EV updates, and market stories.
                                </h1>
                                <p className="text-sm leading-7 text-slate-300 md:text-base">
                                    Built to match the home page tone, this layout gives the blog a sharper publication feel
                                    with featured storytelling, quick discovery, and a more premium reading flow.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {categories.slice(1, 5).map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => setSelectedCategory(category)}
                                        className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                                            selectedCategory === category
                                                ? "border-blue-400 bg-blue-500 text-white"
                                                : "border-white/15 bg-white/5 text-slate-200 hover:border-blue-300 hover:bg-white/10"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
                            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                                <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Stories</p>
                                <p className="mt-4 text-3xl font-semibold text-white">{BLOGS.length}</p>
                                <p className="mt-2 text-sm text-slate-300">Fresh reviews, comparisons, and launch coverage.</p>
                            </div>
                            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                                <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Categories</p>
                                <p className="mt-4 text-3xl font-semibold text-white">{categories.length - 1}</p>
                                <p className="mt-2 text-sm text-slate-300">SUVs, EVs, hatchbacks, and sedan breakdowns.</p>
                            </div>
                            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                                <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Filtered</p>
                                <p className="mt-4 text-3xl font-semibold text-white">{filteredBlogs.length}</p>
                                <p className="mt-2 text-sm text-slate-300">Results update instantly as readers browse topics.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.6fr_0.75fr]">
                    <div className="space-y-8">
                        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                            <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">
                                        Editorial Feed
                                    </p>
                                    <h2 className="text-3xl font-bold text-slate-900">Latest from the garage desk</h2>
                                </div>
                                <div className="w-full md:max-w-sm">
                                    <label className="mb-2 block text-sm font-medium text-slate-600">Search stories</label>
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search by title, summary, or author"
                                        className="w-full rounded-full border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => setSelectedCategory(category)}
                                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                                            selectedCategory === category
                                                ? "bg-slate-900 text-white"
                                                : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {featuredBlog ? (
                            <Link
                                to={`/blog-info/${featuredBlog.slug}`}
                                className="group grid overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)] transition hover:-translate-y-1 lg:grid-cols-[1.1fr_0.9fr]"
                            >
                                <div className="relative min-h-[320px] overflow-hidden">
                                    <img
                                        src={getImageSrc(featuredBlog.image)}
                                        alt={featuredBlog.title}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent" />
                                    <div className="absolute left-5 top-5">
                                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-900">
                                            Featured Story
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between p-6 md:p-8">
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                                            <span>{featuredBlog.category}</span>
                                            <span>{formatDate(featuredBlog.publishedDate)}</span>
                                        </div>
                                        <h3 className="text-3xl font-bold leading-tight text-slate-900">
                                            {featuredBlog.title}
                                        </h3>
                                        <p className="text-base leading-7 text-slate-600">
                                            {featuredBlog.descriptionPreview}
                                        </p>
                                    </div>

                                    <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">
                                        <div>
                                            <p className="text-sm text-slate-500">Written by</p>
                                            <p className="font-semibold text-slate-900">{featuredBlog.author}</p>
                                        </div>
                                        <span className="inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                                            Read article
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                                <p className="text-lg font-semibold text-slate-900">No stories matched your filters.</p>
                                <p className="mt-2 text-sm text-slate-500">Try a different search term or switch back to All categories.</p>
                            </div>
                        )}

                        {secondaryBlogs.length > 0 && (
                            <div className="grid gap-6 md:grid-cols-3">
                                {secondaryBlogs.map((blog) => (
                                    <Link
                                        key={blog.id}
                                        to={`/blog-info/${blog.slug}`}
                                        className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <div className="overflow-hidden">
                                            <img
                                                src={getImageSrc(blog.image)}
                                                alt={blog.title}
                                                className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="space-y-3 p-5">
                                            <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                                                <span>{blog.category}</span>
                                                <span>{formatDate(blog.publishedDate)}</span>
                                            </div>
                                            <h3 className="text-xl font-semibold leading-snug text-slate-900">
                                                {blog.title}
                                            </h3>
                                            <p className="text-sm leading-6 text-slate-600">
                                                {blog.descriptionPreview}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {archiveBlogs.length > 0 && (
                            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                                <div className="mb-5 flex items-center justify-between">
                                    <h3 className="text-2xl font-bold text-slate-900">More stories</h3>
                                    <p className="text-sm text-slate-500">{archiveBlogs.length} articles</p>
                                </div>

                                <div className="space-y-4">
                                    {archiveBlogs.map((blog) => (
                                        <Link
                                            key={blog.id}
                                            to={`/blog-info/${blog.slug}`}
                                            className="grid gap-4 rounded-[1.5rem] border border-transparent p-3 transition hover:border-slate-200 hover:bg-slate-50 md:grid-cols-[220px_1fr]"
                                        >
                                            <img
                                                src={getImageSrc(blog.image)}
                                                alt={blog.title}
                                                className="h-40 w-full rounded-[1.2rem] object-cover"
                                            />
                                            <div className="flex flex-col justify-center">
                                                <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                                                    <span>{blog.category}</span>
                                                    <span>{formatDate(blog.publishedDate)}</span>
                                                    <span>{blog.author}</span>
                                                </div>
                                                <h4 className="mt-3 text-xl font-semibold text-slate-900">{blog.title}</h4>
                                                <p className="mt-2 text-sm leading-6 text-slate-600">{blog.descriptionPreview}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <aside className="space-y-6 lg:sticky lg:top-24">
                        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Browse smarter</p>
                            <h3 className="mt-3 text-2xl font-bold text-slate-900">Professional structure, still on-brand</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                The page now follows the same cool blue and slate palette from home, but uses a stronger
                                editorial rhythm so the blog feels more deliberate and premium.
                            </p>
                        </div>

                        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-900">Category snapshot</h3>
                            <div className="mt-5 space-y-3">
                                {categories.slice(1).map((category) => {
                                    const total = normalizedBlogs.filter((blog) => blog.category === category).length;
                                    return (
                                        <button
                                            key={category}
                                            type="button"
                                            onClick={() => setSelectedCategory(category)}
                                            className="flex w-full items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-left transition hover:bg-slate-100"
                                        >
                                            <span className="font-medium text-slate-700">{category}</span>
                                            <span className="rounded-full bg-white px-3 py-1 text-sm text-slate-500 shadow-sm">
                                                {total}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-sm">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">Reading note</p>
                            <p className="mt-4 text-2xl font-bold leading-snug">
                                Lead story first, quick reads next, archive below.
                            </p>
                            <p className="mt-3 text-sm leading-7 text-slate-300">
                                That hierarchy makes the page feel closer to a magazine or newsroom instead of a repeated list of similar cards.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default Blogs;
