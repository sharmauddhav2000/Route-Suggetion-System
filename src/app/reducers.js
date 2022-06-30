import { combineReducers } from 'redux';
import { weatherSlice } from '../components/index';

export default combineReducers({
  weatherInfo: weatherSlice,
});
