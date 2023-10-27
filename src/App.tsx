import { useEffect, useReducer } from 'react';
import {
  WeatherStateContext,
  WeatherDispatchContext,
  initialState,
  weatherReducer,
} from './contexts/WeatherContext/WeatherContext';
import Header from './components/Header/Header';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import WeatherDetails from './pages/WeatherDetails/WeatherDetails';
import { fetchWeather } from './api/api';
import Footer from './components/Footer/Footer';
import './App.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="app">
        <Header />
        <Outlet />
        <Footer />
      </div>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/details/:city',
        element: <WeatherDetails />,
      },
    ],
  },
]);

const App = () => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      const data = await fetchWeather(state.location);
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
        <RouterProvider router={router} />
      </WeatherDispatchContext.Provider>
    </WeatherStateContext.Provider>
  );
};

export default App;
