import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import NotFound from 'pages/NotFound';
import PRepDetail from 'pages/PRepDetail';
import PRepList from 'pages/PRepList';
import ProjectDetail from 'pages/ProjectDetail';
import ProjectList from 'pages/ProjectList';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return null;
}

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Switch>
        <Redirect exact from="/" to="/projects" />

        <Route exact path="/projects" component={ProjectList} />
        <Route exact path="/projects/:projectSlug" component={ProjectDetail} />

        <Route exact path="/preps" component={PRepList} />
        <Route exact path="/preps/:pRepSlug" component={PRepDetail} />

        <NotFound default />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
