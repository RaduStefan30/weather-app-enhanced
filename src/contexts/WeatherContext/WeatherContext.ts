// contexts/WeatherContext/WeatherContext.tsx

import { createContext, Dispatch } from 'react';
import { WeatherAction, WeatherState } from '../../types';
const tempUnit = localStorage.getItem('temp') || 'celsius';
const distanceUnit = localStorage.getItem('distance') || 'km';
const quantityUnit = localStorage.getItem('quantity') || 'mm';

const initialState: WeatherState = {
  data: null,
  location: '',
  loading: false,
  error: '',
  units: {
    temp: tempUnit,
    distance: distanceUnit,
    quantity: quantityUnit,
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
