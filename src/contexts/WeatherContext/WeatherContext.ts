// contexts/WeatherContext/WeatherContext.tsx

import { createContext, Dispatch } from 'react';
import { WeatherAction, WeatherState } from '../../types';

const initialState: WeatherState = {
  data: null,
  location: 'london',
  loading: false,
  error: '',
};

const WeatherStateContext = createContext<WeatherState | undefined>(undefined);
const WeatherDispatchContext = createContext<
  Dispatch<WeatherAction> | undefined
>(undefined);

const weatherReducer = (
  state: WeatherState,
  action: WeatherAction
): WeatherState => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export {
  WeatherStateContext,
  WeatherDispatchContext,
  initialState,
  weatherReducer,
};
