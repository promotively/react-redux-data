/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-data}
 * @license MIT
 */

// import axios from 'axios';
import { compose } from 'redux';
import { createFormInputValueSelector } from '@promotively/react-redux-form';
import Users from '../components/users';
import users from '../data.json';
import { withData } from '../../src';
import { connect as withRedux } from 'react-redux';

const mapStateToProps = (state, props) => {
  const formId = 'search';
  const inputId = 'keywords';
  const formInputValueSelector = createFormInputValueSelector(formId, inputId);

  return {
    [inputId]: formInputValueSelector(state, props)
  };
};

const fetchUsers = (props) => {
  const { keywords } = props;

  /*
   * All you have to do here is return a promise. In this example we are mocking
   * a fake api call to a /users endpoint that accepts a keywords parameter to
   * filter users by matching their name against the keywords. The equivalent
   * using axios to get the data from a server might look something like this.
   * @example
   * // This is a working example using axios and can be used instead of the fake
   * // api promise mock which this example uses by default.
   * return axios.get(`http://localhost:3000/api/v1/users${keywords ? `?search=${keywords}` : ''}`)
   *   .then((response) => (
   *     response.data.users
   *   ));
   */
  return new Promise((resolve) => (
    // Use setTimeout and Math.random to simulate server loading and latency times.
    setTimeout(() => (
      resolve(
        // Use Array.filter and String.includes to simulate server side keyword search.
        keywords ? users.filter(
          (user) => user.name.toLowerCase().includes(keywords.toLowerCase())
        ) : users.sort(
          // Use Array.sort to simulate server side data sorting
          (previous, next) => (
            previous.id - next.id
          )
        )
      )
    ), Math.floor(Math.random() * 300) + 100)
  ));
};

const UsersContainer = compose(
  withRedux(mapStateToProps),
  withData('users', fetchUsers)
)(Users);

export default UsersContainer;
