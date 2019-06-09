/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

/* eslint-disable react/prop-types */

import React from 'react';
import SearchForm from '../components/search-form';

const handleSubmit = (props) => () => new Promise((resolve, reject) => {
  const { action, keywords, promise } = props;

  return action('users', () => promise({ keywords })).then(resolve).catch(reject);
});

const SearchFormContainer = (props) => (
  <SearchForm
    id={props.id}
    onSubmit={handleSubmit(props)}
  />
);

export default SearchFormContainer;
