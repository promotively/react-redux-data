import { ParametricSelector } from 'reselect';

/**
 * promotively/react-redux-data
 *
 * @copyright Promotively (c) 2020
 * @author Steven Ewing <steven.ewing@promotively.com>
 * @license MIT
 *
 * @see {@link https://promotively.com}
 * @see {@link https://github.com/promotively/react-redux-data}
 */

/**
 * @see {@link https://github.com/microsoft/typescript}
 */

// Type definitions for @promotively/react-redux-data


// data constants

export const DATA_LOADING: string;
export const DATA_ERROR: string;
export const DATA_COMPLETE: string;
export const DATA_DESTROY: string;


// data types

export type DataType = number | string | boolean | object | Array<number | string | boolean | object>;

export type DataSource = () => Promise<DataType>;

// data interfaces

export interface DataComponentProps {
  destroy?: boolean;
  id: string;
  query?: object;
  source: DataSource;
}

export interface DataHookOptions {
  destroy?: boolean;
  query?: object;
  source: DataSource;
}

export interface DataHookResult {
  data?: DataType;
  error?: null | string;
  loading?: boolean;
}

export interface DataErrorAction {
  id: string;
  type: string;
}

export interface DataLoadingAction {
  id: string;
  type: string;
}

export interface DataCompleteAction {
  id: string;
  data: DataType;
  type: string;
}

export interface DataDestroyAction {
  id: string;
  type: string;
}

export type DataActions = DataErrorAction | DataLoadingAction | DataCompleteAction | DataDestroyAction;

export interface DataState {
  data: DataType;
  error: null | string;
  loading: boolean;
}

// data action creators

export function errorData(id: string, error: Error): DataErrorAction;

export function loadingData(id: string): DataLoadingAction;

export function completeData(id: string, data: DataType): DataCompleteAction;

export function fetchData(id: string, query: object, source: DataSource): Promise<DataType>;

export function destroyData(id: string): DataRemoveAction;

// data reducer

export function dataReducer(state: DataState, action: DataActions): object;

// data components

export function DataComponent(props: DataComponentProps): JSX.Element;

export function Data(props: DataComponentProps): JSX.Element;

// data helpers

export function useData(id: string, options: DataHookOptions): DataHookResult;

export function withData<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentClass<P & DataComponentProps>;

export function hydrateStore(app: object, store: object, data: Array): Promise<object[]>;

// data selectors

export function createDataErrorSelector(id: string): ParametricSelector<object, DataComponentProps, string>;

export function createDataLoadingSelector(id: string): ParametricSelector<object, DataComponentProps, boolean>;

export function createDataSelector(id: string): ParametricSelector<object, DataComponentProps, DataType>;
