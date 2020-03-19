const COMMUNITY_API = process.env.REACT_APP_COMMUNITY_API;
const PREPS_API = process.env.REACT_APP_PREPS_API;

export async function getAllPReps() {
  const response = await fetch(`${PREPS_API}/preps`);
  return response.json();
}

export async function getFilters() {
  const response = await fetch(`${COMMUNITY_API}/prep/filters/`);
  const { categories } = await response.json();
  return { categories };
}
