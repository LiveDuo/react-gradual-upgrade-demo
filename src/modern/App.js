/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {Suspense} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import HomePage from './HomePage';
import AboutPage from './AboutPage';

export default function App() {

  return (
    <BrowserRouter>
      <div style={{fontFamily: 'sans-serif'}}>
        <div
          style={{
            margin: 20,
            padding: 20,
            border: '1px solid black',
            minHeight: 300,
          }}>
          <br />
          <Suspense fallback={null}>
            <Switch>
              <Route path="/about">
                <AboutPage />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}
