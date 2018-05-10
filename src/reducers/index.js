import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import EventsReducer from './reducer_events';
import WeatherReducer from './reducer_weather';
import ActiveMonthReducer from './reducer_selected_month';
import SelectedDayReducer from './reducer_selected_day';

const rootReducer = combineReducers({
//   posts: PostsReducer,
  form: formReducer,
  events: EventsReducer,
  weather: WeatherReducer,
  activeMonth: ActiveMonthReducer,
  selectedDay: SelectedDayReducer
});

export default rootReducer;
