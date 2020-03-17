import React from 'react';
import { Redirect, Router as ReachRouter } from '@reach/router';
import PRepDetail from 'pages/PRepDetail';
import PRepList from 'pages/PRepList';
import ProjectDetail from 'pages/ProjectDetail';
import ProjectList from 'pages/ProjectList';

function Router() {
  return (
    <ReachRouter>
      <Redirect exact from="/" to="/projects" />
      <ProjectList path="/projects" />
      <ProjectDetail path="/projects/:projectId" />
      <PRepList path="/preps" />
      <PRepDetail path="/preps/:pRepAddress" />
    </ReachRouter>
  );
}

export default Router;
