const COMMUNITY_API = process.env.REACT_APP_COMMUNITY_API;
const FEEDBACK_API = process.env.REACT_APP_FEEDBACK_API;

export async function getAllProjects() {
  return getProjects(`${COMMUNITY_API}/prep-projects/?limit=50&ordering=created_date`);
}

async function getProjects(nextRequest, allProjects = []) {
  if (!nextRequest) return allProjects;
  const response = await fetch(nextRequest);
  const { next, results } = await response.json();
  return await getProjects(next, allProjects.concat(results));
}

export async function getProject(projectId) {
  const response = await fetch(`${COMMUNITY_API}/prep-projects/${projectId}/`);
  if (response.status !== 200) throw new Error(`Project ${projectId} not found`);
  return response.json();
}

export async function getFilters() {
  const [
    { categories, recent_activity: recentActivity, status: statuses },
    { rating: ratings },
  ] = await Promise.all([
    fetch(`${COMMUNITY_API}/prep-projects/filters/`).then(response => response.json()),
    fetch(`${FEEDBACK_API}/filters`).then(response => response.json()),
  ]);
  return { categories, ratings, recentActivity, statuses };
}
