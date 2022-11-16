/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {Link} from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <h2>src/modern/HomePage.js</h2>
      <h3>
        This component is rendered by the outer React ({React.version}).
      </h3>
      <b>
        <Link to="/about">Go to About</Link>
      </b>
    </>
  );
}
