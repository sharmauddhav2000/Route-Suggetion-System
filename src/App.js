import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MapComponent from './components/Map/MapComponent';
import { useDispatch } from 'react-redux';
import WeatherData from './components/Weather/WeatherData';
import { getWeatherByLocation } from './components/weather.slice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeatherByLocation());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MapComponent />}></Route>
          <Route path="/weather" element={<WeatherData />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
