import { useEffect, useState } from "react";
import MeriGaadiHome from "./MeriGaadiHome";

const fetchData = async (path, signal) => {
    const response = await fetch(path, {
        signal,
        headers: { Accept: "application/json" },
    });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const result = await response.json();
    return result.data;
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

const RetryButton = ({ onClick }) => (
    <button type="button" className="mg-retry-button" onClick={onClick}>
        Try again
    </button>
);

export default function HomePage({ heroLayout = "overlay" }) {
    const [homepage, setHomepage] = useState(null);
    const [featuredContent, setFeaturedContent] = useState([]);
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
                setFeaturedContent(featuredResult.value);
                setFeaturedStatus("success");
            } else {
                setFeaturedContent([]);
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
            <div className="mg-home-loading" aria-busy="true" aria-label="Loading homepage">
                <div className="mg-home-loading-hero" />
                <div className="mg-content mg-home-loading-cards">
                    <div /><div /><div />
                </div>
            </div>
        );
    }

    if (homepageStatus === "error" || !homepage) {
        return (
            <div className="mg-home mg-home-error">
                <p className="mg-eyebrow">Meri Gaadi</p>
                <h1>The homepage isn’t available right now.</h1>
                <p role="alert">We couldn’t load the latest homepage content.</p>
                <RetryButton onClick={retry} />
            </div>
        );
    }

    return (
        <MeriGaadiHome
            homepage={homepage}
            featuredContent={featuredContent}
            featuredStatus={featuredStatus}
            onRetry={retry}
            heroLayout={heroLayout}
        />
    );
}