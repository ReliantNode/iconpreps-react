import React from 'react';
import Layout from 'components/Layout';
import Meta from 'components/Meta';
import ProjectList from 'components/ProjectList';

function ProjectListPage() {
  return (
    <Layout>
      <Meta title="Projects" description="Search for projects that ICON P-Reps are working on." />

      <ProjectList title="ICON P-Rep projects" />
    </Layout>
  );
}

export default ProjectListPage;
