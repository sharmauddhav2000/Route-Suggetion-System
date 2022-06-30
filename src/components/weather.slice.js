import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getItem, setItem } from '../helpers/sessionStorage';
import { weatherAppAPI } from '../helpers/API';
const weather = createSlice({
  name: 'weather',
  initialState: {
    isLoading: getItem('weather') ? false : true,
    weatherData: getItem('weather') ? getItem('weather').weatherData : {},
    forcastData: getItem('weather') ? getItem('weather').forcastData : [],
    sourceInput: {},
    destInput: {},
    sourceWeatherData: {},
    sourceForecastData: {},
    destWeatherData: {},
    destForecastData: {},

    isError: false,
  },

  reducers: {
    setDataSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.weatherData = payload.weatherData;
      state.forcastData = payload.forcastData;
    },
    initDataLoading: (state, { payload }) => {
      state.isLoading = true;
    },
    initDataError: (state, { payload }) => {
      state.isError = true;
    },
    setSourceDataSuccessValue: (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.sourceWeatherData = payload.sourceWeatherData;
      state.sourceForecastData = payload.sourceForecastData;
    },
    setDestDataSuccessValue: (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.destWeatherData = payload.destWeatherData;
      state.destForecastData = payload.destForecastData;
    },
    setSourceAndDestinationInputs: (state, { payload }) => {
      state.isLoading = false;
      state.sourceInput = payload.sourceInput;
      state.destInput = payload.destInput;
    },
  },
});

export const {
  initDataLoading,
  setDataSuccess,
  initDataError,
  setSourceDataSuccessValue,
  setDestDataSuccessValue,
  setSourceAndDestinationInputs,
} = weather.actions;

export default weather.reducer;

export const getWeatherByLocation = () => (dispatch) => {
  const success = async (position) => {
    try {
      let { latitude, longitude } = position.coords;
      // let latitude = 20.5579,
      //   longitude = 74.5089;

      dispatch(initDataLoading());
      let weatherData = await axios.get(
        `/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAppAPI}`
      );
      weatherData = weatherData.data;
      let forcastData = await axios.get(
        `/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${weatherAppAPI}`
      );
      console.log('API call');
      forcastData = forcastData.data.daily;
      let payload = { weatherData, forcastData };
      dispatch(setDataSuccess(payload));
      setItem('weather', payload);
      // myToast(toast, 'Your location weather updated', 'success');
    } catch (err) {
      console.log(err);
      dispatch(initDataError());
    }
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    // myToast(toast, 'Please turn on your location', 'error');
  };

  navigator.geolocation.getCurrentPosition(success, error);
};

export const getWeatherSource = (coordinates) => async (dispatch) => {
  try {
    let [longitude, latitude] = coordinates;
    dispatch(initDataLoading());

    let sourceWeatherData = await axios.get(
      `/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAppAPI}`
    );

    let { lon, lat } = sourceWeatherData?.data?.coord;
    console.log(lon, lat);
    let sourceForecastData = await axios.get(
      `/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${weatherAppAPI}`
    );
    sourceForecastData = sourceForecastData.data.daily;
    let payload = { sourceWeatherData, sourceForecastData };
    dispatch(setSourceDataSuccessValue(payload));
    setItem('weather', payload);
    // myToast(toast, 'City weather data updated', 'success');
  } catch (err) {
    console.log(err);
    dispatch(initDataError());
    // myToast(toast, "City weather data doesn't exist", 'error');
  }
};

export const getWeatherDest = (coordinates) => async (dispatch) => {
  try {
    let [longitude, latitude] = coordinates;
    dispatch(initDataLoading());

    let destWeatherData = await axios.get(
      `/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAppAPI}`
    );

    let { lon, lat } = destWeatherData?.data?.coord;
    console.log(lon, lat);
    let destForecastData = await axios.get(
      `/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${weatherAppAPI}`
    );
    destForecastData = destForecastData.data.daily;
    let payload = { destWeatherData, destForecastData };
    dispatch(setDestDataSuccessValue(payload));
    setItem('weather', payload);
    // myToast(toast, 'City weather data updated', 'success');
  } catch (err) {
    console.log(err);
    dispatch(initDataError());
    // myToast(toast, "City weather data doesn't exist", 'error');
  }
};
