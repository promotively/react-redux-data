/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://www.github.com/promotively/react-redux-data}
 * @license MIT
 */

import axios from 'axios';
import Users from '../components/users';
import { withData } from '../../src/index';

const fetchUsers = () => (
  axios.get('http://localhost:3000/api/v1/users').then((response) => (
    response.data.users
  ))
);

const UsersContainer = withData('users', fetchUsers)(Users);

export default UsersContainer;
