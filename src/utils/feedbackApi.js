const ENDPOINT = process.env.REACT_APP_FEEDBACK_API;

export async function getAllRatings() {
  const response = await fetch(`${ENDPOINT}/ratings/`);
  return response.json();
}

export async function getFeedback(projectId) {
  const response = await fetch(`${ENDPOINT}/feedback/?project_id=${projectId}`);
  return response.json();
}

export async function addFeedback(projectId, rating, comment) {
  const response = await fetch(`${ENDPOINT}/feedback/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      project_id: projectId,
      rating,
      comment,
    }),
  });
  return response.json();
}
