import React, { useEffect } from 'react';
import Layout from 'components/Layout';
import { usePReps } from 'components/PReps';
import SearchHeader from 'components/SearchHeader';

function ProjectListPage() {
  const { getPReps, hasPReps } = usePReps();

  useEffect(() => {
    if (hasPReps) {
      console.log('Getting P-Reps!', getPReps());
    }
  }, [getPReps, hasPReps]);

  return (
    <Layout>
      <SearchHeader title="ICON P-Rep projects" />
    </Layout>
  );
}

export default ProjectListPage;
