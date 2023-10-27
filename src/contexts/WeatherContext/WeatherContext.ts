// contexts/WeatherContext/WeatherContext.tsx

import { createContext, Dispatch } from 'react';
import { WeatherAction, WeatherState } from '../../types';
import { getSearchesFromLocalStorage } from '../../utils/utils';

const lastSearch = getSearchesFromLocalStorage()[0] || 'london';

const initialState: WeatherState = {
  data: null,
  location: lastSearch,
  loading: false,
  error: '',
  units: {
    temp: 'celsius',
    distance: 'km',
    quantity: 'mm',
  },
};

const WeatherStateContext = createContext<WeatherState>(initialState);
const WeatherDispatchContext = createContext<Dispatch<WeatherAction>>(() => {});

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
    case 'UPDATE_LOCATION':
      return { ...state, location: action.payload };
    case 'UPDATE_UNITS':
      return { ...state, units: { ...action.payload } };
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
