import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CAR_USE_CASES, getCarUseCase } from "../constants/carUseCases";
import { fetchCars } from "../services/cars";
import "../merigaadihome.css";

function getCarHref(car) {
  const brandSlug = car.brand?.slug;
  return brandSlug && car.slug ? `/cars/${brandSlug}/${car.slug}` : "/cars";
}

function CarCard({ car }) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageUrl = car.image_url;
  const fuelTypes = Array.isArray(car.fuel_types) ? car.fuel_types : [];
  const transmissions = Array.isArray(car.transmission_types) ? car.transmission_types : [];

  return (
    <article className="mg-car-card">
      <Link className="mg-car-image-link" to={getCarHref(car)} aria-label={`Explore ${car.name}`}>
        {imageUrl && !imageFailed ? (
          <img className="mg-car-image" src={imageUrl} alt={car.name} loading="lazy" onError={() => setImageFailed(true)} />
        ) : (
          <span className="mg-listing-image-placeholder" aria-hidden="true">MADE FOR THE ROAD</span>
        )}
        <span className="mg-car-image-arrow" aria-hidden="true">↗</span>
      </Link>
      <div className="mg-car-copy">
        <span className="mg-card-kicker">{car.body_type || "CAR"}</span>
        <h2><Link to={getCarHref(car)}>{car.name}</Link></h2>
        {car.brand?.name && <p>{car.brand.name}</p>}
        {(fuelTypes.length > 0 || transmissions.length > 0) && (
          <div className="mg-car-facts">
            {fuelTypes.map((fuel) => <span key={`fuel-${fuel}`}>{fuel}</span>)}
            {transmissions.map((transmission) => <span key={`transmission-${transmission}`}>{transmission}</span>)}
          </div>
        )}
      </div>
    </article>
  );
}

export default function CarsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listing, setListing] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const queryString = searchParams.toString();
  const selectedKey = searchParams.get("use_case");
  const selectedUseCase = getCarUseCase(selectedKey);
  const invalidUseCase = selectedKey && !selectedUseCase ? selectedKey : "";
  const pageNumber = Number(searchParams.get("page"));
  const page = Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    setError("");

    fetchCars(queryString, controller.signal)
      .then((response) => {
        if (controller.signal.aborted) return;
        setListing(response);
        setStatus("success");
      })
      .catch((requestError) => {
        if (controller.signal.aborted) return;
        setError(requestError.message || "The car list could not be loaded. Please try again.");
        setStatus("error");
      });

    return () => controller.abort();
  }, [queryString, retryCount]);

  const updateSearchParams = useCallback((change) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      change(next);
      return next;
    });
  }, [setSearchParams]);

  const selectUseCase = (key) => {
    updateSearchParams((next) => {
      if (key) next.set("use_case", key);
      else next.delete("use_case");
      next.delete("page");
    });
  };

  const goToPage = (nextPage) => {
    updateSearchParams((next) => {
      if (nextPage > 1) next.set("page", String(nextPage));
      else next.delete("page");
    });
  };

  const cars = listing?.data || [];

  return (
    <div className="mg-home mg-listing-page">
      <div className="mg-content mg-listing-content">
        <section className="mg-listing-heading" aria-labelledby="mg-listing-title">
          <p className="mg-eyebrow">Find your fit</p>
          <h1 id="mg-listing-title">{selectedUseCase ? `Cars for ${selectedUseCase.label.toLowerCase()}` : "Explore cars"}</h1>
          <p>Explore available models and the details we have for each one.</p>
        </section>

        <section className="mg-listing-filters" aria-label="Car list filters">
          <label htmlFor="mg-use-case-filter">What do you need your car to do?</label>
          <select
            id="mg-use-case-filter"
            value={selectedUseCase?.key || ""}
            onChange={(event) => selectUseCase(event.target.value)}
          >
            <option value="">All cars</option>
            {CAR_USE_CASES.map((item) => (
              <option key={item.key} value={item.key}>{item.label}</option>
            ))}
          </select>
          {selectedUseCase && (
            <button type="button" className="mg-listing-clear" onClick={() => selectUseCase("")}>
              Clear use-case filter
            </button>
          )}
        </section>

        {invalidUseCase && (
          <p className="mg-listing-notice" role="status">
            “{invalidUseCase}” isn’t a recognized use case. Showing all cars.{" "}
            <button type="button" onClick={() => selectUseCase("")}>Clear invalid filter</button>
          </p>
        )}

        {status === "loading" && (
          <div className="mg-listing-status" aria-busy="true" aria-live="polite">
            Loading cars…
          </div>
        )}

        {status === "error" && (
          <div className="mg-listing-status mg-listing-error" role="alert">
            <p>{error}</p>
            <button type="button" onClick={() => setRetryCount((count) => count + 1)}>Try again</button>
          </div>
        )}

        {status === "success" && cars.length === 0 && (
          <div className="mg-listing-status mg-listing-empty" role="status">
            <h2>{selectedUseCase ? `No cars found for ${selectedUseCase.label.toLowerCase()} yet.` : "No cars found."}</h2>
            <p>Try a different use case or browse all available cars.</p>
            {selectedUseCase && <button type="button" onClick={() => selectUseCase("")}>Clear filter and see all cars</button>}
          </div>
        )}

        {status === "success" && cars.length > 0 && (
          <>
            <p className="mg-listing-count" aria-live="polite">
              {listing.total} {listing.total === 1 ? "car" : "cars"}{selectedUseCase ? ` for ${selectedUseCase.label.toLowerCase()}` : ""}
            </p>
            <div className="mg-car-grid">
              {cars.map((car) => <CarCard key={car.id} car={car} />)}
            </div>
            {listing.last_page > 1 && (
              <nav className="mg-listing-pagination" aria-label="Car list pages">
                <button type="button" onClick={() => goToPage(page - 1)} disabled={page <= 1}>
                  Previous
                </button>
                <span>Page {listing.current_page} of {listing.last_page}</span>
                <button type="button" onClick={() => goToPage(page + 1)} disabled={page >= listing.last_page}>
                  Next
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}
