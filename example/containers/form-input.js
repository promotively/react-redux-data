/*
 * @promotively/react-redux-data
 *
 * @copyright (c) 2018-2019, Promotively
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @see {@link https://github.com/promotively/react-redux-data}
 * @license MIT
 */

import FormInput from '../components/form-input';
import { withFormInput } from '@promotively/react-redux-form';

const FormInputContainer = withFormInput(FormInput);

export default FormInputContainer;
