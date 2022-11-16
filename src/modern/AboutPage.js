/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import lazyLegacyRoot from './lazyLegacyRoot';

// Lazy-load a component from the bundle using legacy React.
const Greeting = lazyLegacyRoot(() => import('../legacy/Greeting'));

function AboutPage() {
  return (
    <>
      <h2>src/modern/AboutPage.js</h2>
      <h3>
        This component is rendered by the outer React ({React.version}).
      </h3>
      <Greeting />
      <br />
    </>
  );
}

export default AboutPage;
