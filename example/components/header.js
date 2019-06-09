/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

/* eslint-disable max-len */
/* eslint-disable react/prop-types */

import Alert from './alert';
import GitHubLink from './github-link';
import React from 'react';
import WebLink from './web-link';

const Header = (props) => (
  <div style={{ position: 'relative' }}>
    <WebLink />
    <GitHubLink project="react-redux-data" />
    <h1 style={{ marginTop: 0 }}>react-redux-data Example</h1>
    <div
      style={{
        padding: '10px',
        position: 'absolute',
        right: '-20px',
        top: '-20px'
      }}
    >
      <Alert type="warn">
        Tip: React Developer Tools, Redux Dev Tools and Source Maps are all enabled in this example.
      </Alert>
    </div>
    <p>This is an example of a universal react.js/redux.js/node.js web application using the <a href="https://www.github.com/promotively/react-redux-data">@promotively/react-redux-data</a> library to fetch a list of users and render the result in the browser and/or server.</p>
    <p><a href="https://promotively-react-redux-data.s3-us-west-1.amazonaws.com/docs/index.html">Read the documentation</a> for more details including a simple step by step guide.</p>
    <div style={{ marginBottom: '10px' }}>
      <Alert type="info">Note: This page was initially rendered {props.platform === 'server' ? 'with node.js' : 'in the browser'}.</Alert>
    </div>
  </div>
);

export default Header;
