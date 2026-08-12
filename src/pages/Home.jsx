import { Link } from "react-router-dom";
import HEADER_IMAGE from "../assets/images/car-01.jpg";
import blogs from "../assets/data/blogs.js";
import CATEGORIES from "../assets/data/categories.json";
import { categoryCardGradient } from "../constants/categoryGradients";

const getDescription = (blog) => blog.shorDescription || blog.shortDescription || "";
const getImageSrc = (image) => (image?.startsWith("http") ? image : `${window.location.origin}/${image.replace(/^\//, "")}`);

const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

const Home = () => {
    const heroBlog = blogs[0];
    const featuredBlogs = blogs.slice(1, 4);
    const latestBlogs = blogs.slice(4, 10);

    return (
        <div>
            <section className="relative isolate overflow-hidden bg-slate-950">
                <div className="absolute inset-0">
                    <img src={HEADER_IMAGE} alt="Meri Gaadi hero" className="h-full w-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.28),_transparent_36%),linear-gradient(135deg,rgba(2,6,23,0.98),rgba(15,23,42,0.92),rgba(30,64,175,0.72))]" />
                </div>

                <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                    <div className="space-y-7 text-white">
                        <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-100">
                            Meri Gaadi Editorial
                        </span>
                        <div className="max-w-2xl space-y-5">
                            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                                Indian auto stories shaped like a publication, not a parts catalog.
                            </h1>
                            <p className="max-w-xl text-sm leading-7 text-slate-300 md:text-base">
                                Reviews, comparisons, EV coverage, and buying insights arranged with stronger hierarchy so the
                                site feels more premium from the first scroll.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/blogs"
                                className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                            >
                                Explore all stories
                            </Link>
                            {heroBlog && (
                                <Link
                                    to={`/blog-info/${heroBlog.slug}`}
                                    className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                                >
                                    Read featured review
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                        <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 text-white backdrop-blur-sm">
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Coverage</p>
                            <p className="mt-4 text-3xl font-semibold">{blogs.length}</p>
                            <p className="mt-2 text-sm text-slate-300">Stories across launches, comparisons, and ownership topics.</p>
                        </div>
                        <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 text-white backdrop-blur-sm">
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Focus</p>
                            <p className="mt-4 text-3xl font-semibold">{Object.keys(CATEGORIES).length}</p>
                            <p className="mt-2 text-sm text-slate-300">SUVs, EVs, sedans, hatchbacks, and fast-moving segments.</p>
                        </div>
                        <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 text-white backdrop-blur-sm">
                            <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Tone</p>
                            <p className="mt-4 text-3xl font-semibold">Clean</p>
                            <p className="mt-2 text-sm text-slate-300">Blue-slate visuals carried through from the updated blog page.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-4 py-6 md:px-8 md:py-8">
                <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200/80 bg-slate-50 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] md:p-10">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    {heroBlog && (
                        <Link
                            to={`/blog-info/${heroBlog.slug}`}
                            className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_55px_rgba(15,23,42,0.12)] transition hover:-translate-y-1"
                        >
                            <div className="relative h-full overflow-hidden">
                                <img
                                    src={getImageSrc(heroBlog.image)}
                                    alt={heroBlog.title}
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/10 to-transparent" />
                                <div className="absolute left-6 top-6">
                                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-900">
                                        Editor&apos;s Pick
                                    </span>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                                    <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-slate-200">
                                        <span>{heroBlog.category}</span>
                                        <span>{formatDate(heroBlog.publishedDate)}</span>
                                    </div>
                                    <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
                                        {heroBlog.title}
                                    </h2>
                                    <p className="mt-3 max-w-xl text-sm leading-7 text-slate-200 md:text-base">
                                        {getDescription(heroBlog)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    )}

                    <div className="space-y-5">
                        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
                            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Why this layout</p>
                            <h2 className="mt-3 text-3xl font-bold text-slate-900">Built like a front page</h2>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                The home page now introduces the strongest story first, then moves readers into curated topics
                                and fresh articles without repeating the same card pattern.
                            </p>
                        </div>

                        {featuredBlogs.map((blog) => (
                            <Link
                                key={blog.id}
                                to={`/blog-info/${blog.slug}`}
                                className="group flex gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <img
                                    src={getImageSrc(blog.image)}
                                    alt={blog.title}
                                    className="h-28 w-28 rounded-[1.25rem] object-cover"
                                />
                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                                        <span>{blog.category}</span>
                                        <span>{formatDate(blog.publishedDate)}</span>
                                    </div>
                                    <h3 className="mt-2 text-lg font-semibold leading-snug text-slate-900">
                                        {blog.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        {getDescription(blog)}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                </div>
            </section>

            <section className="px-4 py-6 md:px-8 md:py-8">
                <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200/80 bg-slate-50 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] md:p-8">
                <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Categories</p>
                        <h2 className="mt-2 text-3xl font-bold text-slate-900">Start with the segment you care about</h2>
                    </div>
                    <Link to="/blogs" className="hidden text-sm font-semibold text-slate-600 transition hover:text-blue-600 md:inline-flex">
                        Browse archive
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {Object.entries(CATEGORIES).map(([category, categoryObj]) => (
                        <Link
                            key={category}
                            to={`/blogs?category=${category}`}
                            className="group relative flex min-h-[18rem] flex-col justify-end overflow-hidden rounded-[1.9rem] bg-slate-900 p-6 text-white shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
                        >
                            <div
                                className={`absolute inset-0 bg-gradient-to-br opacity-95 transition duration-500 group-hover:scale-105 group-hover:opacity-100 ${categoryCardGradient(category)}`}
                                aria-hidden
                            />
                            <div
                                className="absolute inset-0 opacity-25 mix-blend-overlay"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3), transparent 42%), radial-gradient(circle at 75% 70%, rgba(59,130,246,0.2), transparent 45%)",
                                }}
                                aria-hidden
                            />
                            <div className="relative">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-100/90">Category</p>
                                <h3 className="mt-2 text-2xl font-bold">{categoryObj.name}</h3>
                                <p className="mt-2 text-sm text-slate-200/90">
                                    Explore focused stories, comparisons, and launch notes.
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                </div>
            </section>

            <section className="px-4 pb-10 pt-2 md:px-8 md:pb-14 md:pt-4">
                <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200/80 bg-slate-50 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] md:p-10">
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Latest stories</p>
                        <h2 className="mt-2 text-3xl font-bold text-slate-900">Fresh reads from the garage desk</h2>
                    </div>
                    <Link
                        to="/blogs"
                        className="inline-flex items-center rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
                    >
                        View all posts
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {latestBlogs.map((blog) => (
                        <Link
                            key={blog.id}
                            to={`/blog-info/${blog.slug}`}
                            className="group overflow-hidden rounded-[1.85rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={getImageSrc(blog.image)}
                                    alt={blog.title}
                                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="space-y-3 p-5">
                                <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                                    <span>{blog.category}</span>
                                    <span>{formatDate(blog.publishedDate)}</span>
                                </div>
                                <h3 className="text-xl font-semibold leading-snug text-slate-900">{blog.title}</h3>
                                <p className="text-sm leading-6 text-slate-600">{getDescription(blog)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
