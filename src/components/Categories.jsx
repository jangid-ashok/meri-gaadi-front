import { Link } from "react-router-dom";
import CATEGORIES from "../assets/data/categories.json";
import { categoryCardGradient } from "../constants/categoryGradients";

const Categories = () => {
  return (
    <div>
      <section className="border-b border-slate-200/80 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-200">Browse</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight md:text-5xl">
            Categories built for how Indians shop for cars
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
            Jump into a segment to see reviews, comparisons, and launch coverage in one place.
          </p>
        </div>
      </section>

      <section className="px-4 py-8 md:px-8 md:py-12">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200/80 bg-slate-50 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] md:p-10">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">All segments</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">Pick a category</h2>
            </div>
            <Link
              to="/blogs"
              className="inline-flex w-fit rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-400 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              View full archive
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Object.entries(CATEGORIES).map(([category, categoryObj]) => (
              <Link
                key={category}
                to={`/blogs?category=${category}`}
                className="group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-[1.85rem] bg-slate-900 p-6 text-white shadow-[0_18px_45px_rgba(15,23,42,0.15)] ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(15,23,42,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br opacity-95 transition duration-500 group-hover:scale-105 group-hover:opacity-100 ${categoryCardGradient(category)}`}
                  aria-hidden
                />
                <div
                  className="absolute inset-0 opacity-20 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35), transparent 45%), radial-gradient(circle at 80% 80%, rgba(59,130,246,0.25), transparent 40%)",
                  }}
                  aria-hidden
                />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-100/90">Category</p>
                  <h3 className="mt-2 text-2xl font-bold leading-tight">{categoryObj.name}</h3>
                  <p className="mt-2 text-sm text-slate-200/90">Stories and comparisons in this segment →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
