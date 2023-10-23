import { useEffect, useReducer } from 'react';
import './styles/main.scss';
import {
  WeatherStateContext,
  WeatherDispatchContext,
  initialState,
  weatherReducer,
} from './contexts/WeatherContext/WeatherContext';
import { fetchWeatherData } from './api/fetchWeather';

const App = () => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      const data = await fetchWeatherData(state.location);
      if (!data)
        return dispatch({
          type: 'FETCH_FAILURE',
          payload: 'Could not retrieve any data',
        });
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    };
    fetchData();
  }, [state.location]);

  return (
    <WeatherStateContext.Provider value={state}>
      <WeatherDispatchContext.Provider value={dispatch}>
        Mare app
      </WeatherDispatchContext.Provider>
    </WeatherStateContext.Provider>
  );
};

export default App;
