import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DEFAULT_HERO_IMAGE from "../assets/images/hero-default.jpg";

const fetchData = async (path, signal) => {
    const response = await fetch(path, {
        signal,
        headers: { Accept: "application/json" },
    });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log(`Fetched data from ${path}:`, result);
    return result.data;
};

const getImage = (image) => {
    if (typeof image === "string") return { url: image };
    return image && typeof image === "object" ? image : null;
};

const formatDate = (date) => {
    if (!date || Number.isNaN(Date.parse(date))) return null;
    return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const applySeoTag = (selector, tagName, keyName, keyValue, valueName, value) => {
    let element = document.head.querySelector(selector);
    if (!element && !value) return null;

    const created = !element;
    if (created) {
        element = document.createElement(tagName);
        element.setAttribute(keyName, keyValue);
        document.head.appendChild(element);
    }

    const previousValue = element.getAttribute(valueName);
    if (value) element.setAttribute(valueName, value);
    else element.removeAttribute(valueName);

    return () => {
        if (created) element.remove();
        else if (previousValue === null) element.removeAttribute(valueName);
        else element.setAttribute(valueName, previousValue);
    };
};

const useHomepageSeo = (seo) => {
    useEffect(() => {
        if (!seo) return undefined;

        const previousTitle = document.title;
        document.title = seo.title || previousTitle;

        const changes = [
            ["meta[name='description']", "meta", "name", "description", "content", seo.description],
            ["meta[name='robots']", "meta", "name", "robots", "content", seo.robots],
            ["meta[property='og:title']", "meta", "property", "og:title", "content", seo.og?.title],
            ["meta[property='og:description']", "meta", "property", "og:description", "content", seo.og?.description],
            ["meta[property='og:image']", "meta", "property", "og:image", "content", seo.og?.image],
            ["meta[name='twitter:card']", "meta", "name", "twitter:card", "content", seo.twitter?.card],
            ["meta[name='twitter:title']", "meta", "name", "twitter:title", "content", seo.twitter?.title],
            ["meta[name='twitter:description']", "meta", "name", "twitter:description", "content", seo.twitter?.description],
            ["meta[name='twitter:image']", "meta", "name", "twitter:image", "content", seo.twitter?.image],
            ["link[rel='canonical']", "link", "rel", "canonical", "href", seo.canonical],
        ].map(([selector, tagName, keyName, keyValue, valueName, value]) =>
            applySeoTag(selector, tagName, keyName, keyValue, valueName, value)
        ).filter(Boolean);

        return () => {
            document.title = previousTitle;
            changes.reverse().forEach((restore) => restore());
        };
    }, [seo]);
};

const ImagePanel = ({ image, alt, className = "" }) => {
    const [failed, setFailed] = useState(false);
    const media = getImage(image);

    return (
        <div className={`relative overflow-hidden bg-[#dce7d6] ${className}`}>
            {media?.url && !failed ? (
                <img
                    src={media.url}
                    alt={media.alt_text || alt || ""}
                    loading="lazy"
                    decoding="async"
                    onError={() => setFailed(true)}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            ) : (
                <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[#dce7d6]">
                    <div className="absolute inset-y-0 right-[16%] w-[30%] -skew-x-[28deg] border-x-[14px] border-dashed border-[#5d8065]/55" />
                    <div className="absolute -right-10 top-0 h-full w-[28%] skew-x-[-28deg] bg-[#c2d3bd]" />
                    <span className="absolute bottom-2 left-4 font-serif text-5xl font-bold text-[#31513c]/25" aria-hidden="true">
                        MG
                    </span>
                </div>
            )}
        </div>
    );
};

const HeroImage = ({ image, alt }) => {
    const media = getImage(image);
    const source = media?.url || DEFAULT_HERO_IMAGE;
    const [failedSource, setFailedSource] = useState(null);
    const imageSource = failedSource === source ? DEFAULT_HERO_IMAGE : source;
    const usingFallback = imageSource === DEFAULT_HERO_IMAGE;

    return (
        <div className="absolute inset-y-0 right-0 w-full overflow-hidden bg-[#263c35] lg:w-[72%] xl:w-[76%]">
            <img
                src={imageSource}
                alt={usingFallback ? "Car on the road" : media?.alt_text || alt || "Featured car"}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                onError={() => {
                    if (!usingFallback) setFailedSource(source);
                }}
                className="absolute inset-0 h-full w-full object-contain object-top lg:object-right"
            />
        </div>
    );
};

const getItemHref = (item, type = "content") => {
    if (item?.cta?.url) return item.cta.url;
    if (item?.url) return item.url;
    if (type === "article" && item?.slug) return `/blog-info/${item.slug}`;
    if (type === "brand" && item?.slug) return `/brands/${item.slug}`;
    if (type === "category" && item?.slug) return `/categories/${item.slug}`;
    if (type === "car" && item?.brand?.slug && item?.slug) return `/cars/${item.brand.slug}/${item.slug}`;
    return null;
};

const SectionHeading = ({ title, eyebrow, intro, action }) => (
    <div className="mb-7 flex flex-col gap-3 sm:mb-8">
        {eyebrow && <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#e3825a]">{eyebrow}</p>}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-3xl font-serif text-3xl font-bold leading-[1.05] text-[#14251d] sm:text-4xl">{title}</h2>
            {action}
        </div>
        {intro && <p className="max-w-2xl text-sm leading-6 text-[#4d5b55] sm:text-base">{intro}</p>}
    </div>
);

const SectionState = ({ children, error = false }) => (
    <p
        role={error ? "alert" : "status"}
        className={`border-l-2 px-4 py-3 text-sm leading-6 ${error ? "border-[#d76b49] bg-[#fff4f1] text-[#7f382a]" : "border-[#c7d3bd] bg-[#f7f9f3] text-[#55625d]"}`}
    >
        {children}
    </p>
);

const LoadingCards = ({ count = 3 }) => (
    <div aria-label="Loading content" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }, (_, index) => (
            <div key={index} aria-hidden="true" className="h-56 animate-pulse rounded-[1.5rem] bg-[#eaf0e5]" />
        ))}
    </div>
);

const ContentSection = ({ id, title, eyebrow, intro, status, items, emptyMessage, children, onRetry, action }) => (
    <section
        aria-labelledby={`${id}-heading`}
        className={`px-4 sm:px-6 lg:px-8 ${status === "success" && items.length === 0 ? "py-6 md:py-8" : "py-10 md:py-14"}`}
    >
        <div className="mx-auto max-w-7xl">
            <SectionHeading title={<span id={`${id}-heading`}>{title}</span>} eyebrow={eyebrow} intro={intro} action={action} />
            {status === "loading" && <LoadingCards />}
            {status === "error" && (
                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <SectionState error>Featured content could not be loaded.</SectionState>
                    {onRetry && <RetryButton onClick={onRetry} />}
                </div>
            )}
            {status === "success" && (items.length ? children : <SectionState>{emptyMessage}</SectionState>)}
        </div>
    </section>
);

const RetryButton = ({ onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className="inline-flex min-h-11 items-center border border-[#1a3129] bg-[#1a3129] px-4 text-sm font-bold text-white transition hover:bg-[#213d34] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e3825a] focus-visible:ring-offset-2"
    >
        Try again
    </button>
);

const FeaturedCard = ({ item }) => {
    const href = getItemHref(item);
    const metaLabel = item.category?.name || item.category || item.brand?.name || "Feature";

    const card = (
        <>
            <div className="relative overflow-hidden">
                <ImagePanel image={item.image} alt={item.image?.alt_text || item.title} className="aspect-[16/9]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d201a]/80 via-[#0d201a]/10 to-transparent" aria-hidden="true" />
                <span className="absolute left-4 top-4 inline-flex rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f8f8f1] backdrop-blur-sm">
                    {metaLabel}
                </span>
            </div>
            <div className="p-5 sm:p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6d7c74]">Meri Gaadi Pick</p>
                <h3 className="mt-3 font-serif text-2xl font-bold leading-snug text-[#152722]">{item.title}</h3>
                {item.description && <p className="mt-3 text-sm leading-6 text-[#51635d]">{item.description}</p>}
                {item.cta?.text && (
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#bf4f35]">
                        {item.cta.text}
                        <span aria-hidden="true">→</span>
                    </span>
                )}
            </div>
        </>
    );

    if (!href) {
        return <article className="group overflow-hidden rounded-[1.75rem] border border-[#dfe5de] bg-white shadow-[0_18px_45px_rgba(20,37,29,0.06)]">{card}</article>;
    }

    return (
        <Link
            to={href}
            className="group block overflow-hidden rounded-[1.75rem] border border-[#dfe5de] bg-white shadow-[0_18px_45px_rgba(20,37,29,0.06)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(20,37,29,0.12)]"
        >
            {card}
        </Link>
    );
};

const CatalogCard = ({ item, type }) => {
    const heading = item.name || item.title;
    const href = getItemHref(item, type);
    const supportingText = type === "car" ? item.brand?.name || item.model || "Featured model" : item.description || item.subtitle || "Explore the segment";
    const label = type === "car" ? "Model" : type === "brand" ? "Brand" : "Segment";

    const card = (
        <>
            {type !== "category" ? (
                <div className="overflow-hidden">
                    <ImagePanel image={item.image} alt={heading} className="aspect-[16/10]" />
                </div>
            ) : (
                <div className="flex min-h-[170px] items-end bg-[radial-gradient(circle_at_top_left,_rgba(247,195,71,0.25),transparent_38%),linear-gradient(135deg,#1b312d_0%,#13241d_100%)] p-5">
                    <div className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#edf0bc]">{label}</div>
                </div>
            )}
            <div className="p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6d7c74]">{label}</p>
                <h3 className="mt-3 font-serif text-2xl font-bold leading-snug text-[#152722]">{heading}</h3>
                {supportingText && <p className="mt-2 text-sm leading-6 text-[#51635d]">{supportingText}</p>}
            </div>
        </>
    );

    const classes = "group block overflow-hidden rounded-[1.6rem] border border-[#dfe5de] bg-white shadow-[0_18px_45px_rgba(20,37,29,0.05)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(20,37,29,0.12)]";

    if (!href) {
        return <article className={classes}>{card}</article>;
    }

    return <Link to={href} className={classes}>{card}</Link>;
};

const ArticleCard = ({ article }) => {
    const date = formatDate(article.published_at || article.publishedAt || article.date);
    const href = getItemHref(article, "article");

    const card = (
        <>
            <ImagePanel image={article.image} alt={article.title} className="aspect-[16/10]" />
            <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#6d7c74]">
                    {article.category?.name && <span className="text-[#bf4f35]">{article.category.name}</span>}
                    {article.category?.name && date && <span aria-hidden="true">·</span>}
                    {date && <time dateTime={article.published_at || article.publishedAt || article.date}>{date}</time>}
                </div>
                <h3 className="mt-3 font-serif text-2xl font-bold leading-snug text-[#152722]">{article.title}</h3>
                {article.excerpt && <p className="mt-3 text-sm leading-6 text-[#51635d]">{article.excerpt}</p>}
                {article.author && <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#69766a]">{article.author}</p>}
            </div>
        </>
    );

    const classes = "group block overflow-hidden rounded-[1.6rem] border border-[#dfe5de] bg-white shadow-[0_18px_45px_rgba(20,37,29,0.05)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(20,37,29,0.12)]";

    if (!href) {
        return <article className={classes}>{card}</article>;
    }

    return <Link to={href} className={classes}>{card}</Link>;
};

const renderSection = (key, section, homepageStatus, retry) => {
    if (key === "hero" || key === "seo" || !section || typeof section !== "object") return null;

    const items = Array.isArray(section.items) ? section.items : [];
    const status = homepageStatus;
    let content = null;
    let emptyMessage = "There is no content to show here right now.";
    let eyebrow = null;
    let intro = section.description || null;
    let action = null;

    if (key === "featured_cars") {
        emptyMessage = "No featured cars are available right now.";
        eyebrow = "Discover cars";
        intro = "The strongest contenders for Indian roads and budgets, curated without the clutter.";
        action = (
            <Link to="/categories" className="inline-flex items-center rounded-full border border-[#d4d9d3] bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#1f332c] transition hover:border-[#c9d1c9] hover:bg-[#f5f7f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e3825a]">
                Explore all
            </Link>
        );
        content = <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map((item) => <CatalogCard key={item.id} item={item} type="car" />)}</div>;
    } else if (key === "popular_brands") {
        emptyMessage = "No brands are available right now.";
        eyebrow = "Brands to know";
        intro = "A quick look at the nameplates shaping purchase decisions and road presence.";
        content = <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map((item) => <CatalogCard key={item.id} item={item} type="brand" />)}</div>;
    } else if (key === "car_categories") {
        emptyMessage = "No car categories are available right now.";
        eyebrow = "Explore segments";
        intro = "Browse by vehicle type to narrow your shortlist with less noise.";
        action = (
            <Link to="/categories" className="inline-flex items-center rounded-full border border-[#d4d9d3] bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#1f332c] transition hover:border-[#c9d1c9] hover:bg-[#f5f7f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e3825a]">
                Browse categories
            </Link>
        );
        content = <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{items.map((item) => <CatalogCard key={item.id} item={item} type="category" />)}</div>;
    } else if (key === "latest_articles") {
        emptyMessage = "No articles are available right now.";
        eyebrow = "From the journal";
        intro = "Reviews, comparisons, and launch stories crafted for real-world buying decisions.";
        action = (
            <Link to="/blogs" className="inline-flex items-center rounded-full border border-[#d4d9d3] bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#1f332c] transition hover:border-[#c9d1c9] hover:bg-[#f5f7f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e3825a]">
                Read more
            </Link>
        );
        content = <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map((item) => <ArticleCard key={item.id} article={item} />)}</div>;
    } else {
        eyebrow = "Picked for the road";
        intro = section.description || "Freshly selected reads and car stories to help you choose better.";
        content = <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map((item) => <FeaturedCard key={item.id} item={item} />)}</div>;
    }

    return (
        <ContentSection
            key={key}
            id={`home-${key}`}
            title={section.title || "Featured"}
            eyebrow={eyebrow}
            intro={intro}
            status={status}
            items={items}
            emptyMessage={emptyMessage}
            onRetry={status === "error" ? retry : null}
            action={action}
        >
            {content}
        </ContentSection>
    );
};

const Home = () => {
    const [homepage, setHomepage] = useState(null);
    const [featuredItems, setFeaturedItems] = useState([]);
    const [homepageStatus, setHomepageStatus] = useState("loading");
    const [featuredStatus, setFeaturedStatus] = useState("loading");
    const [retryCount, setRetryCount] = useState(0);
    const [seo, setSeo] = useState(null);

    useHomepageSeo(seo);

    useEffect(() => {
        const controller = new AbortController();
        setHomepageStatus("loading");
        setFeaturedStatus("loading");

        Promise.allSettled([
            fetchData("/api/homepage", controller.signal),
            fetchData("/api/featured-content", controller.signal),
            fetchData("/api/seo/homepage", controller.signal),
        ]).then(([homepageResult, featuredResult, seoResult]) => {
            if (controller.signal.aborted) return;

            if (homepageResult.status === "fulfilled" && homepageResult.value && typeof homepageResult.value === "object" && !Array.isArray(homepageResult.value)) {
                setHomepage(homepageResult.value);
                setHomepageStatus("success");
            } else {
                setHomepageStatus("error");
            }

            if (featuredResult.status === "fulfilled" && Array.isArray(featuredResult.value)) {
                setFeaturedItems(featuredResult.value);
                setFeaturedStatus("success");
            } else {
                setFeaturedStatus("error");
            }

            if (seoResult.status === "fulfilled") {
                setSeo(seoResult.value?.seo || null);
            }
        });

        return () => controller.abort();
    }, [retryCount]);

    const retry = () => setRetryCount((count) => count + 1);

    if (homepageStatus === "loading") {
        return (
            <div className="min-h-[70vh] bg-[#f4f5ee]" aria-busy="true" aria-label="Loading homepage">
                <div className="min-h-[660px] animate-pulse bg-[#142b25] sm:min-h-[740px] lg:min-h-[680px] xl:min-h-[640px]" />
                <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
                    <LoadingCards />
                </div>
            </div>
        );
    }

    if (homepageStatus === "error" || !homepage) {
        return (
            <div className="grid min-h-[60vh] place-items-center bg-[#f4f5ee] px-4 py-16">
                <div className="max-w-lg text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b74430]">Meri Gaadi</p>
                    <h1 className="mt-3 font-serif text-3xl font-bold text-[#1c2b23]">The homepage isn’t available right now.</h1>
                    <p role="alert" className="mt-3 text-sm leading-6 text-[#58645a]">We couldn’t load the latest homepage content.</p>
                    <div className="mt-6 flex justify-center"><RetryButton onClick={retry} /></div>
                </div>
            </div>
        );
    }

    const hero = homepage.hero || {};
    const sectionEntries = Object.entries(homepage)
        .filter(([key, section]) => key !== "seo" && key !== "hero" && section && typeof section === "object" && "display_order" in section)
        .sort(([, first], [, second]) => first.display_order - second.display_order);
    const apiBanners = [
        ...(Array.isArray(hero.banners) ? hero.banners : []),
        ...(Array.isArray(homepage.promotion?.items) ? homepage.promotion.items : []),
        ...(Array.isArray(homepage.featured_cars?.banners) ? homepage.featured_cars.banners : []),
    ];
    const bannerIds = new Set(apiBanners.map((item) => item.id));
    const visiblePlacements = new Set([
        ...(hero.enabled ? ["homepage_hero"] : []),
        ...(homepage.promotion?.enabled ? ["homepage_promotion"] : []),
        ...(homepage.featured_cars?.enabled ? ["homepage_featured"] : []),
    ]);
    const banners = [
        ...apiBanners,
        ...featuredItems.filter((item) => visiblePlacements.has(item.placement) && !bannerIds.has(item.id)),
    ];

    return (
        <div className="overflow-hidden bg-[#f4f5ee] text-[#1c2b23]">
            {homepage.hero && (
                <section aria-labelledby="home-heading" className="relative isolate min-h-[660px] overflow-hidden bg-[#142b25] text-white sm:min-h-[740px] lg:min-h-[680px] xl:min-h-[640px]">
                    <HeroImage image={hero.image} alt={hero.title} />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,31,25,0.02)_0%,rgba(13,31,25,0.04)_34%,rgba(13,31,25,0.76)_60%,#10241e_100%)] lg:bg-[linear-gradient(90deg,#10241e_0%,rgba(16,36,30,0.96)_25%,rgba(16,36,30,0.58)_47%,rgba(16,36,30,0.06)_76%)]" aria-hidden="true" />
                    <div className="absolute inset-y-0 right-0 hidden w-[72%] bg-[linear-gradient(135deg,rgba(227,185,106,0.12),transparent_48%)] lg:block" aria-hidden="true" />
                    <div className="relative mx-auto flex min-h-[660px] max-w-[1600px] items-end px-4 py-9 sm:min-h-[740px] sm:px-6 sm:py-12 lg:min-h-[680px] lg:px-8 xl:min-h-[640px] xl:items-center">
                        <div className="relative z-10 max-w-2xl pb-1 lg:max-w-[420px] xl:max-w-[520px]">
                            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#efc98a]">
                                <span className="h-1 w-8 bg-[#f1784e]" aria-hidden="true" />
                                Meri Gaadi
                            </p>
                            <h1 id="home-heading" className="mt-5 max-w-2xl font-serif text-4xl font-bold leading-[1.02] sm:text-5xl xl:text-6xl">
                                {hero.title || "Meri Gaadi"}
                            </h1>
                            {hero.subtitle && <p className="mt-4 max-w-xl text-base leading-7 text-white/85 sm:text-lg">{hero.subtitle}</p>}
                            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7">
                                {hero.cta?.text && hero.cta?.url && (
                                    hero.cta.url.startsWith("/") ? (
                                        <Link
                                            to={hero.cta.url}
                                            className="inline-flex min-h-12 items-center gap-3 bg-[#f1784e] px-5 py-3 text-sm font-bold text-[#122720] transition-colors hover:bg-[#ff9a6e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#142b25]"
                                        >
                                            {hero.cta.text}<span aria-hidden="true">→</span>
                                        </Link>
                                    ) : (
                                        <a
                                            href={hero.cta.url}
                                            className="inline-flex min-h-12 items-center gap-3 bg-[#f1784e] px-5 py-3 text-sm font-bold text-[#122720] transition-colors hover:bg-[#ff9a6e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#142b25]"
                                        >
                                            {hero.cta.text}<span aria-hidden="true">→</span>
                                        </a>
                                    )
                                )}
                                <Link to="/categories" className="inline-flex min-h-12 items-center border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#142b25]">
                                    Browse segments
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-[#f1784e]" aria-hidden="true" />
                </section>
            )}

            <ContentSection
                id="home-featured-content"
                title="Featured"
                eyebrow="Picked for the road"
                intro="Fresh storylines, standout models, and buying guidance that feels useful rather than noisy."
                status={featuredStatus}
                items={banners}
                emptyMessage="There’s no featured content to show right now."
                onRetry={retry}
            >
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{banners.map((item) => <FeaturedCard key={item.id} item={item} />)}</div>
            </ContentSection>

            {sectionEntries.map(([key, section]) => renderSection(key, section, homepageStatus, retry))}
        </div>
    );
};

export default Home;
