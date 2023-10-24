import { useEffect, useReducer } from 'react';
import {
  WeatherStateContext,
  WeatherDispatchContext,
  initialState,
  weatherReducer,
} from './contexts/WeatherContext/WeatherContext';
import { fetchWeatherData } from './api/fetchWeather';
import Header from './components/Header/Header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/forecast/:city',
    element: <div>Mare forecast</div>,
  },
]);

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
        <Header />
        <RouterProvider router={router} />
      </WeatherDispatchContext.Provider>
    </WeatherStateContext.Provider>
  );
};

export default App;
