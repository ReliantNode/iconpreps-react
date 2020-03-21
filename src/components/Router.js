import React, { useEffect } from 'react';
import { Redirect, Router as ReachRouter } from '@reach/router';
import NotFound from 'pages/NotFound';
import PRepDetail from 'pages/PRepDetail';
import PRepList from 'pages/PRepList';
import ProjectDetail from 'pages/ProjectDetail';
import ProjectList from 'pages/ProjectList';

function ScrollToTop({ children, location }) {
  useEffect(() => window.scrollTo(0, 0), [location.pathname]);

  return children;
}

function Router() {
  return (
    <ReachRouter primary={false}>
      <ScrollToTop path="/">
        <Redirect exact from="/" to="/projects" noThrow />
        <ProjectList path="/projects" />
        <ProjectDetail path="/projects/:projectSlug" />
        <PRepList path="/preps" />
        <PRepDetail path="/preps/:pRepSlug" />
        <NotFound default />
      </ScrollToTop>
    </ReachRouter>
  );
}

export default Router;
