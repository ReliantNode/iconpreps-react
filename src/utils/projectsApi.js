const ENDPOINT = process.env.REACT_APP_COMMUNITY_API;

export async function getAllProjects() {
  return getProjects(`${ENDPOINT}/prep-projects/?limit=50&ordering=created_date`);
}

async function getProjects(nextRequest, allProjects = []) {
  if (!nextRequest) return allProjects;
  const response = await fetch(nextRequest);
  const { next, results } = await response.json();
  return await getProjects(next, allProjects.concat(results));
}

export async function getProject(projectId) {
  const response = await fetch(`${ENDPOINT}/prep-projects/${projectId}/`);
  if (response.status !== 200) throw new Error(`Project ${projectId} not found`);
  return response.json();
}
