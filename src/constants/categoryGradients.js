/** Tailwind gradient direction + stops for category tiles (no image dependency). */
export const categoryCardGradient = (key) => {
  const map = {
    hatchback: "from-emerald-800 via-emerald-950 to-slate-950",
    suv: "from-blue-700 via-indigo-950 to-slate-950",
    muv: "from-amber-800 via-orange-950 to-slate-950",
    sedan: "from-slate-600 via-slate-900 to-slate-950",
    ev: "from-cyan-700 via-blue-900 to-slate-950",
    supercar: "from-rose-900 via-red-950 to-slate-950",
    "pickup-truck": "from-stone-700 via-amber-950 to-slate-950",
    convertible: "from-violet-800 via-purple-950 to-slate-950",
  };
  return map[key] || "from-slate-700 via-slate-900 to-slate-950";
};
