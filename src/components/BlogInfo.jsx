import BLOGS from "../assets/data/blogs.js";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";

const getImageSrc = (image) =>
  image?.startsWith("http") ? image : `${window.location.origin}/${image.replace(/^\//, "")}`;

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const BlogInfo = () => {
  const { slug } = useParams();
  const post = BLOGS.find((b) => b.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="px-4 py-20">
        <div className="mx-auto max-w-lg rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Not found</p>
          <h1 className="mt-3 text-2xl font-bold text-slate-900">This story is unavailable</h1>
          <p className="mt-2 text-sm text-slate-600">
            The link may be outdated or the article was removed.
          </p>
          <Link
            to="/blogs"
            className="mt-8 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Back to all stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="pb-16 pt-6 md:pb-20 md:pt-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200/80 bg-slate-50 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] sm:p-8 md:p-10">
        <nav className="mb-8 text-left" aria-label="Breadcrumb">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
          >
            <span aria-hidden>←</span> All stories
          </Link>
        </nav>

        <div className="animate-article-enter">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">{post.category}</span>
            <span>{formatDate(post.publishedDate)}</span>
          </div>

          <h1 className="mt-4 text-left text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="mt-4 text-left text-lg text-slate-600 md:text-xl">{post.subtitle}</p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-slate-200 pb-8 text-left">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-700">
              {(post.author || "M").slice(0, 1)}
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Written by</p>
              <p className="text-base font-semibold text-slate-900">{post.author || "Editorial team"}</p>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-[1.5rem] bg-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/5">
            <img
              src={getImageSrc(post.image)}
              alt={post.title}
              className="aspect-[21/9] w-full max-h-[min(70vh,520px)] object-cover md:aspect-[2.4/1]"
            />
          </div>

          <div
            className={[
              "prose prose-slate mt-10 max-w-none text-left",
              "prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:text-slate-900",
              "prose-p:text-slate-600 prose-p:leading-relaxed",
              "prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline",
              "prose-strong:text-slate-800",
              "prose-blockquote:border-l-blue-500 prose-blockquote:text-slate-600",
              "prose-li:text-slate-600",
              "md:prose-lg",
            ].join(" ")}
          >
            {typeof post.description === "string" && post.description.trim().startsWith("<")
              ? parse(post.description)
              : parse(`<p>${post.description || ""}</p>`)}
          </div>
        </div>
        </div>
      </div>
    </article>
  );
};

export default BlogInfo;
