import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../merigaadihome.css";
import DEFAULT_HERO_IMAGE from "../assets/images/hero-default.jpg";
import { CAR_USE_CASES, buildCarUseCaseHref } from "../constants/carUseCases";

/**
 * Meri Gaadi homepage content only.
 * Header and footer are intentionally excluded because the app already provides them.
 * Keep content API-driven: pass the existing API data through props after mapping it
 * in the page/container. No backend endpoint or response contract is assumed here.
 */

const safeArray = (value) => (Array.isArray(value) ? value : []);

// Hero-only theme: map an existing featured-car colour to a soft pastel tint and a readable accent.
// Pass the existing car colour into homepage.heroColor from the frontend container; no API change needed.
const HERO_COLOR_PRESETS = {
  red: ["#fff0ef", "#b4232f", "#28191a", "#685354", "#e8c8c7"],
  yellow: ["#fff7df", "#986600", "#282317", "#6f6246", "#e9d8a5"],
  gold: ["#fff5df", "#956300", "#282317", "#6f6246", "#e9d8a5"],
  blue: ["#edf4ff", "#174ea6", "#151e32", "#52647e", "#cbdcf5"],
  green: ["#eef5e9", "#28613a", "#18251b", "#566a58", "#d0dfca"],
  orange: ["#fff0e5", "#b94d19", "#2d1e17", "#765746", "#efcfb9"],
  purple: ["#f4efff", "#6941a5", "#241b31", "#6c607b", "#ded0f0"],
  pink: ["#fff0f5", "#b83264", "#2d1a23", "#765865", "#efccda"],
  white: ["#f4f2ed", "#55534e", "#222321", "#666660", "#ddd9d0"],
  silver: ["#eef1f4", "#4c6077", "#1b222b", "#5d6875", "#d2d9e0"],
  grey: ["#f0f1ef", "#4b5552", "#1d2421", "#5c6762", "#d4d9d5"],
  gray: ["#f0f1ef", "#4b5552", "#1d2421", "#5c6762", "#d4d9d5"],
  black: ["#e9ecea", "#343d39", "#171d1a", "#58635d", "#cdd4cf"],
  charcoal: ["#e9ecea", "#343d39", "#171d1a", "#58635d", "#cdd4cf"],
};

function hexToRgb(hex) {
  const clean = String(hex || "").trim().replace(/^#/, "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return [parseInt(full.slice(0, 2), 16), parseInt(full.slice(2, 4), 16), parseInt(full.slice(4, 6), 16)];
}

function mixHex(hex, target, amount) {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const out = rgb.map((v, i) => Math.round(v * (1 - amount) + target[i] * amount));
  return `#${out.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function getHeroTheme(color) {
  const value = String(color || "").trim().toLowerCase();
  const named = HERO_COLOR_PRESETS[value];
  if (named) return named;
  const normalized = value.startsWith("#") ? value : `#${value}`;
  if (hexToRgb(normalized)) {
    const accent = normalized.length === 4
      ? `#${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`
      : normalized;
    return [
      mixHex(accent, [255, 255, 255], 0.91) || "#f5f4ed",
      mixHex(accent, [20, 24, 21], 0.2) || "#637b29",
      "#20231f",
      "#5d625b",
      mixHex(accent, [255, 255, 255], 0.72) || "#d9ded3",
    ];
  }
  return ["#f5f4ed", "#637b29", "#111715", "#68736a", "#d9ded3"];
}

function heroThemeStyle(color) {
  const [tint, accent, ink, muted, line] = getHeroTheme(color);
  return {
    "--mg-hero-tint": tint,
    "--mg-hero-accent": accent,
    "--mg-hero-ink": ink,
    "--mg-hero-muted": muted,
    "--mg-hero-line": line,
  };
}


const getImageUrl = (image) => {
  if (typeof image === "string") return image;
  return image && typeof image === "object" ? image.url || image.src || null : null;
};

const normalizeStory = (story) => ({
  ...story,
  title: story.title || story.name || "",
  category: story.category?.name || story.category || "",
  excerpt: story.excerpt || story.description || "",
  image: getImageUrl(story.image),
  imageAlt: story.image?.alt_text || story.imageAlt || story.title || "",
  href: story.href || story.cta?.url || (story.slug ? `/blog-info/${story.slug}` : "/blogs"),
});

const getCarHref = (car) => car.href || (
  (car.brandSlug || car.brand?.slug) && car.slug ? `/cars/${car.brandSlug || car.brand.slug}/${car.slug}` : "/cars"
);

function Eyebrow({ children }) {
  return <p className="mg-eyebrow">{children}</p>;
}

function SectionIntro({ eyebrow, title, description, href, linkLabel }) {
  return (
    <div className="mg-section-intro">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2>{title}</h2>
        {description && <p className="mg-section-description">{description}</p>}
      </div>
      {href && <a className="mg-link" href={href}>{linkLabel || "Explore all"} <span aria-hidden="true">↗</span></a>}
    </div>
  );
}

function ImageOrFallback({ src, alt, className = "" }) {
  const [failed, setFailed] = React.useState(false);
  if (!src || failed) {
    return (
      <div className={`mg-image-fallback ${className}`} role="img" aria-label={alt || "Image unavailable"}>
        <span className="mg-fallback-car" aria-hidden="true">
          <svg viewBox="0 0 440 220" focusable="false">
            <path d="M74 137 103 91c7-11 18-18 32-20l104-9c19-2 36 6 49 21l38 43 36 11c10 3 17 12 17 23v13H56v-18c0-9 7-16 18-18Z" />
            <path d="m127 91 109-9c14-1 25 3 35 15l21 28H105l22-34Z" className="mg-car-window" />
            <circle cx="122" cy="171" r="25" /><circle cx="324" cy="171" r="25" />
            <circle cx="122" cy="171" r="10" className="mg-wheel-inner" /><circle cx="324" cy="171" r="10" className="mg-wheel-inner" />
          </svg>
        </span>
        <span className="mg-fallback-caption">MADE FOR THE ROAD</span>
      </div>
    );
  }
  return <img className={className} src={src} alt={alt || ""} loading="lazy" onError={() => setFailed(true)} />;
}

function HeroImage({ src, alt }) {
  const [failed, setFailed] = React.useState(false);
  const image = src && !failed ? src : DEFAULT_HERO_IMAGE;

  return (
    <img
      className="mg-hero-image"
      src={image}
      alt={src && !failed ? alt || "Featured car" : "Car on the road"}
      loading="eager"
      decoding="async"
      fetchPriority="high"
      onError={() => setFailed(true)}
    />
  );
}

function StoryCard({ story, variant = "standard" }) {
  const href = story.href || (story.slug ? `/blog-info/${story.slug}` : "/blogs");
  return (
    <article className={`mg-story-card mg-story-${variant}`}>
      <a href={href} className="mg-story-image-link" aria-label={`Read: ${story.title}`}>
        <ImageOrFallback src={story.image} alt={story.imageAlt || story.title} className="mg-story-image" />
      </a>
      <div className="mg-story-copy">
        <div className="mg-story-meta">
          {story.category && <span>{story.category}</span>}
          {story.date && <><i aria-hidden="true">•</i><span>{story.date}</span></>}
        </div>
        <h3><a href={href}>{story.title}</a></h3>
        {story.excerpt && <p>{story.excerpt}</p>}
        <a className="mg-story-link" href={href}>Read story <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  );
}

function CarCard({ car }) {
  const href = getCarHref(car);
  return (
    <article className="mg-car-card">
      <a className="mg-car-image-link" href={href} aria-label={`Explore ${car.name}`}>
        <ImageOrFallback src={car.image} alt={car.imageAlt || car.name} className="mg-car-image" />
        <span className="mg-car-image-arrow" aria-hidden="true">↗</span>
      </a>
      <div className="mg-car-copy">
        <span className="mg-card-kicker">{car.bodyStyle || "FEATURED CAR"}</span>
        <h3><a href={href}>{car.name}</a></h3>
        {car.brand && <p>{car.brand}</p>}
        {(car.priceLabel || car.fuelType) && <div className="mg-car-facts">
          {car.priceLabel && <span>{car.priceLabel}</span>}
          {car.fuelType && <span>{car.fuelType}</span>}
        </div>}
      </div>
    </article>
  );
}

function BrandStrip({ brands, title }) {
  return (
    <section className="mg-brands-section">
      <div className="mg-brands-heading">
        <div><Eyebrow>Know the makers</Eyebrow><h2>{title || <>Names you know.<br /><em>Roads to discover.</em></>}</h2></div>
        <a className="mg-link" href="/brands">All brands <span aria-hidden="true">↗</span></a>
      </div>
      <div className="mg-brand-list">
        {brands.slice(0, 6).map((brand, i) => (
          <a className="mg-brand-item" href={brand.href || (brand.slug ? `/brands/${brand.slug}` : "/brands")} key={brand.slug || brand.name || i}>
            {brand.image ? (
              <span className="mg-brand-image-wrap">
                <img className="mg-brand-image" src={brand.image} alt={`${brand.name} vehicles`} loading="lazy" />
              </span>
            ) : brand.logo ? (
              <span className="mg-brand-image-wrap mg-brand-logo-wrap">
                <img className="mg-brand-logo" src={brand.logo} alt={`${brand.name} logo`} loading="lazy" />
              </span>
            ) : (
              <span className="mg-brand-image-wrap mg-brand-image-fallback">
                <span className="mg-brand-initial">{(brand.name || "M").slice(0, 1)}</span>
              </span>
            )}
            <span className="mg-brand-name">{brand.name}</span><b aria-hidden="true">↗</b>
          </a>
        ))}
      </div>
    </section>
  );
}

function CarFinder() {
  const location = useLocation();

  return (
    <section className="mg-finder-section">
      <div className="mg-finder-top">
        <div><Eyebrow>Start with your life</Eyebrow><h2>What does your next car<br /><em>need to do for you?</em></h2></div>
        <p>You don't need to know every model name. Start with the way you live, then explore cars that fit.</p>
      </div>
      <div className="mg-finder-grid">
        {CAR_USE_CASES.map((item, i) => (
          <Link to={buildCarUseCaseHref(item.key, location.search)} className={`mg-finder-card mg-finder-card-${i + 1}`} key={item.key}>
            <span className="mg-finder-number">0{i + 1}</span>
            <span className="mg-finder-arrow" aria-hidden="true">↗</span>
            <span className="mg-finder-symbol" aria-hidden="true">{["↗", "⌂", "◉", "⌁", "ϟ", "✳"][i]}</span>
            <h3>{item.label}</h3><p>{item.description}</p>
          </Link>
        ))}
      </div>
      <div className="mg-finder-bottom"><span>YOUR LIFE FIRST. THE RIGHT CAR NEXT.</span><a href="/cars">Explore all cars <b aria-hidden="true">↗</b></a></div>
    </section>
  );
}

function CategoryGrid({ categories, title }) {
  return (
    <section className="mg-category-section">
      <SectionIntro eyebrow="Choose your direction" title={title || <>Different roads.<br /><em>Different kinds of cars.</em></>} description="Explore the segments and find the type of car that fits your next chapter." href="/categories" linkLabel="All categories" />
      <div className="mg-category-grid">
        {categories.slice(0, 4).map((cat, i) => (
          <a href={cat.href || "/categories"} className="mg-category-card" key={cat.slug || cat.name || i}>
            <div className="mg-category-photo"><ImageOrFallback src={cat.image} alt={cat.name} className="mg-category-image" /><span>0{i + 1} / SEGMENT</span></div>
            <div className="mg-category-copy"><h3>{cat.name}</h3><p>{cat.description || "Find your kind of drive."}</p><b aria-hidden="true">↗</b></div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function MeriGaadiHome({
  homepage = {},
  featuredContent = [],
  featuredStatus = "success",
  onRetry,
  heroLayout = "overlay",
}) {
  const hero = homepage.hero || {};
  const promotion = homepage.promotion || {};
  const latestArticles = homepage.latest_articles || {};
  const featuredCars = homepage.featured_cars || {};
  const popularBrands = homepage.popular_brands || {};
  const carCategories = homepage.car_categories || {};
  const articleItems = (latestArticles.enabled === false ? [] : safeArray(latestArticles.items)).map(normalizeStory);
  const carItems = (featuredCars.enabled === false ? [] : safeArray(featuredCars.items)).map((car) => ({
    ...car,
    brandSlug: car.brand?.slug || car.brandSlug,
    brand: car.brand?.name || car.brand || "",
    image: getImageUrl(car.image),
  }));
  const brandItems = (popularBrands.enabled === false ? [] : safeArray(popularBrands.items)).map((brand) => ({
    ...brand,
    logo: getImageUrl(brand.image) || brand.logo || null,
    image: null,
  }));
  const categoryItems = (carCategories.enabled === false ? [] : safeArray(carCategories.items)).map((category) => ({
    ...category,
    image: getImageUrl(category.image),
  }));
  const enabledPlacements = new Set([
    ...(hero.enabled ? ["homepage_hero"] : []),
    ...(promotion.enabled ? ["homepage_promotion"] : []),
    ...(featuredCars.enabled ? ["homepage_featured"] : []),
  ]);
  const storyCandidates = [
    ...(promotion.enabled ? safeArray(promotion.items) : []),
    ...safeArray(hero.banners),
    ...safeArray(featuredCars.banners),
    ...safeArray(featuredContent).filter((item) => enabledPlacements.has(item.placement)),
  ].filter((story) => (story.title || story.name) && (story.slug || story.cta?.url || story.url || story.id));
  const stories = [...new Map(storyCandidates.map((story, index) => [story.id || story.slug || story.title || index, normalizeStory(story)])).values()];
  const leadStory = stories[0];
  const supportingStories = stories.slice(1, 3);
  const visibleArticles = articleItems.slice(0, 3);
  const placementOrder = {
    homepage_hero: Number(hero.display_order) || 1,
    homepage_featured: Number(featuredCars.display_order) || 2,
    homepage_promotion: Number(promotion.display_order) || 6,
  };
  const storyOrder = storyCandidates.length
    ? Math.min(...storyCandidates.map((story) => placementOrder[story.placement] || Number(promotion.display_order) || 6))
    : Number(promotion.display_order) || 6;
  const heroImage = getImageUrl(hero.image);
  const heroTitle = hero.title || homepage.title;
  const layout = heroLayout === "split" ? "split" : "overlay";
  const hasPromotionStory = safeArray(promotion.items).some((item) =>
    stories.some((story) => story.id === item.id || story.slug === item.slug || story.title === item.title)
  );

  return (
    <div className="mg-home">
      {hero.enabled !== false && (
        <section className={`mg-hero mg-hero-${layout}`} style={heroThemeStyle(homepage.heroColor || homepage.heroCarColor || homepage.featuredCarColor)}>
          <div className="mg-hero-copy">
            <div className="mg-hero-kicker"><span /> MADE FOR THE ROAD</div>
            <h1>{heroTitle || "Find your next kind of drive."}</h1>
            {(hero.subtitle || homepage.description) && <p>{hero.subtitle || homepage.description}</p>}
            <div className="mg-hero-actions">
              <a className="mg-button mg-button-lime" href={hero.cta?.url || "/cars"}>{hero.cta?.text || "Explore cars"} <span aria-hidden="true">↗</span></a>
              <a className="mg-button mg-button-ghost" href="/blogs">Read the stories <span aria-hidden="true">↗</span></a>
            </div>
            <div className="mg-hero-foot"><span>01 — FIND YOUR FIT</span><span>CAR CULTURE · BUYING · OWNERSHIP</span></div>
          </div>
          <div className="mg-hero-visual">
            <HeroImage src={heroImage} alt={hero.image?.alt_text || "Featured car"} />
            <div className="mg-hero-overlay" />
            <div className="mg-hero-stamp"><span>MG</span><i>/</i><small>THE ROAD<br />IS YOURS</small></div>
            <div className="mg-hero-caption"><span>THE NEXT CHAPTER</span><span>STARTS HERE ↗</span></div>
          </div>
        </section>
      )}

      <div className="mg-content">
        {featuredStatus === "error" && <p className="mg-inline-alert" role="alert">Some featured picks could not be loaded. <button type="button" onClick={onRetry}>Try again</button></p>}

        {leadStory && <section className="mg-featured-section" style={{ order: storyOrder }}>
          <SectionIntro eyebrow="Stories worth the drive" title={<>A fresh perspective.<br /><em>For every kind of driver.</em></>} description="Thoughtful reads for the curious driver—from first-car questions to the details enthusiasts love." href="/blogs" linkLabel="All stories" />
          <div className="mg-featured-grid">
            <StoryCard story={leadStory} variant="lead" />
            {supportingStories.length > 0 && <div className="mg-featured-side">{supportingStories.map((story, i) => <StoryCard story={story} key={story.slug || story.title || i} variant="compact" />)}</div>}
          </div>
        </section>}

        {carItems.length > 0 && <section className="mg-cars-section" style={{ order: Number(featuredCars.display_order) || 2 }}>
          <SectionIntro eyebrow="Find your fit" title={featuredCars.title || <>Cars to know.<br /><em>Details that matter.</em></>} description="Get to know the models, then dig into the details that matter to you." href="/cars" linkLabel="Explore all cars" />
          <div className="mg-car-grid">{carItems.slice(0, 3).map((car, i) => <CarCard car={car} key={car.slug || car.name || i} />)}</div>
        </section>}

        <div style={{ order: Number(featuredCars.display_order) || 2 }}><CarFinder /></div>

        {brandItems.length > 0 && <div style={{ order: Number(popularBrands.display_order) || 3 }}><BrandStrip brands={brandItems} title={popularBrands.title} /></div>}

        {visibleArticles.length > 0 && <section className="mg-journal-section" style={{ order: Number(latestArticles.display_order) || 4 }}>
          <div className="mg-journal-intro"><Eyebrow>From the journal</Eyebrow><h2>{latestArticles.title || <>Know more.<br /><em>Drive smarter.</em></>}</h2><p>Buying advice, ownership lessons, comparisons, and fresh perspectives—written to help you make sense of the road ahead.</p><a className="mg-button mg-button-dark" href="/blogs">Visit the journal <span aria-hidden="true">↗</span></a></div>
          <div className="mg-journal-grid">{visibleArticles.map((article, i) => <StoryCard story={article} key={article.slug || article.title || i} variant="journal" />)}</div>
        </section>}

        {categoryItems.length > 0 && <div style={{ order: Number(carCategories.display_order) || 5 }}><CategoryGrid categories={categoryItems} title={carCategories.title} /></div>}

        {promotion.enabled && !hasPromotionStory && (promotion.title || promotion.description || promotion.cta?.url) && <section className="mg-bottom-cta" style={{ order: Number(promotion.display_order) || 6 }}>
          <div className="mg-bottom-cta-copy"><Eyebrow>Your next drive starts here</Eyebrow><h2>{promotion.title || "Explore your next drive."}</h2>{promotion.description && <p>{promotion.description}</p>}{promotion.cta?.url && <a className="mg-button mg-button-lime" href={promotion.cta.url}>{promotion.cta.text || "Start exploring"} <span aria-hidden="true">↗</span></a>}</div>
          <div className="mg-bottom-cta-visual" aria-hidden="true"><span className="mg-cta-route">TAKE THE<br />SCENIC ROUTE</span><div className="mg-cta-road" /><span className="mg-cta-number">MG<span>/</span></span></div>
        </section>}
      </div>
    </div>
  );
}
