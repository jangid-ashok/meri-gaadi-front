import { getCarUseCase } from "../constants/carUseCases.js";

export function buildCarsApiUrl(search = "") {
  const searchParams = new URLSearchParams(search);
  const apiParams = new URLSearchParams();
  const useCase = getCarUseCase(searchParams.get("use_case"));
  const page = Number(searchParams.get("page"));

  if (useCase) apiParams.set("use_case", useCase.apiValue);
  if (Number.isInteger(page) && page > 1) apiParams.set("page", String(page));

  const query = apiParams.toString();
  return `/api/cars${query ? `?${query}` : ""}`;
}

export async function fetchCars(search, signal) {
  const response = await fetch(buildCarsApiUrl(search), {
    signal,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`The car list could not be loaded (HTTP ${response.status}).`);
  }

  const result = await response.json();
  if (!Array.isArray(result?.data?.data)) {
    throw new Error("The car list response was not in the expected format.");
  }

  return result.data;
}
