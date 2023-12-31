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
import { fetchWeather, getIP } from './api/api';
import Footer from './components/Footer/Footer';
import './App.scss';
import ErrorPage from './pages/ErrorPage/ErrorPage';

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
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

const App = () => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  useEffect(() => {
    const fetchIP = async () => {
      const location = await getIP();
      if (!state.location)
        dispatch({ type: 'UPDATE_LOCATION', payload: location });
    };

    fetchIP();
  }, [state.location]);

  useEffect(() => {
    if (!state.location) return;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      const data = await fetchWeather(state.location);
      if (!data) {
        return dispatch({
          type: 'FETCH_FAILURE',
          payload: 'Could not retrieve any data',
        });
      }
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
