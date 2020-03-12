import React from 'react';
import { Router as ReachRouter } from '@reach/router';
import PRepDetail from 'pages/PRepDetail';
import PRepList from 'pages/PRepList';
import ProjectDetail from 'pages/ProjectDetail';
import ProjectList from 'pages/ProjectList';

function Router() {
  return (
    <ReachRouter>
      <ProjectList path="/" />
      <ProjectDetail path="/projects/:projectId" />
      <PRepList path="/preps" />
      <PRepDetail path="/preps/:pRepId" />
    </ReachRouter>
  );
}

export default Router;
