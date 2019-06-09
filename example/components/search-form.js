
/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

/* eslint-disable react/prop-types */

import Button from './button';
import FormContainer from '../containers/form';
import FormInputContainer from '../containers/form-input';
import React from 'react';

const SearchForm = (props) => {
  const { id, onSubmit } = props;

  return (
    <FormContainer id={id} onSubmit={onSubmit}>
      <FormInputContainer id="keywords" placeholder="Keywords..." />
      <Button>Search</Button>
    </FormContainer>
  );
};

export default SearchForm;

