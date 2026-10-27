import assert from "node:assert/strict";
import test from "node:test";
import { buildCarUseCaseHref, CAR_USE_CASES, getCarUseCase } from "./carUseCases.js";
import { buildCarsApiUrl } from "../services/cars.js";

test("all six lifestyle keys map to the matching API use_case values", () => {
  assert.deepEqual(
    CAR_USE_CASES.map(({ key, apiValue }) => [key, apiValue]),
    [
      ["first-car", "first-car"],
      ["family", "family"],
      ["city", "city"],
      ["road-trips", "road-trips"],
      ["electric", "electric"],
      ["driving-fun", "driving-fun"],
    ],
  );
});

test("lifestyle links retain other query values and reset pagination", () => {
  assert.equal(
    buildCarUseCaseHref("road-trips", "?brand=maruti&page=3&sort=name"),
    "/cars?brand=maruti&sort=name&use_case=road-trips",
  );
});

test("unknown use-case keys are not sent to the API", () => {
  assert.equal(getCarUseCase("unknown"), undefined);
  assert.equal(buildCarUseCaseHref("unknown", "?use_case=invalid&page=2"), "/cars");
});

test("each selected category uses the existing paginated cars API contract", () => {
  for (const { key, apiValue } of CAR_USE_CASES) {
    assert.equal(buildCarsApiUrl(`?use_case=${key}`), `/api/cars?use_case=${apiValue}`);
  }
  assert.equal(buildCarsApiUrl("?use_case=invalid&page=2"), "/api/cars?page=2");
  assert.equal(buildCarsApiUrl("?use_case=family&page=3"), "/api/cars?use_case=family&page=3");
});
