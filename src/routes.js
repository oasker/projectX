// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router'

import LandingPage from './components/LandingPage/index';
import About from './components/About';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={ LandingPage } />
    <Route path="/about" component={ About } />
    <Route path="*" component={ NotFound } />
  </Router>
);

export default Routes;
