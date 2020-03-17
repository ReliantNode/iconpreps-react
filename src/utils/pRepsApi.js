const ENDPOINT = process.env.REACT_APP_PREPS_API;

export async function getAllPReps() {
  const response = await fetch(`${ENDPOINT}/preps`);
  return response.json();
}
