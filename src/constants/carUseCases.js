export const CAR_USE_CASES = [
  {
    key: "first-car",
    apiValue: "first-car",
    label: "My first car",
    description: "Easy to live with, easy to love",
  },
  {
    key: "family",
    apiValue: "family",
    label: "Family life",
    description: "Space for people and plans",
  },
  {
    key: "city",
    apiValue: "city",
    label: "City driving",
    description: "Compact, practical daily drives",
  },
  {
    key: "road-trips",
    apiValue: "road-trips",
    label: "Long road trips",
    description: "Comfort for the miles ahead",
  },
  {
    key: "electric",
    apiValue: "electric",
    label: "Going electric",
    description: "Explore electric mobility",
  },
  {
    key: "driving-fun",
    apiValue: "driving-fun",
    label: "Driving for fun",
    description: "Performance and personality",
  },
];

export const getCarUseCase = (key) => CAR_USE_CASES.find((item) => item.key === key);

export function buildCarUseCaseHref(key, search = "") {
  const params = new URLSearchParams(search);
  const useCase = getCarUseCase(key);

  params.delete("page");
  if (useCase) params.set("use_case", useCase.key);
  else params.delete("use_case");

  const query = params.toString();
  return query ? `/cars?${query}` : "/cars";
}
