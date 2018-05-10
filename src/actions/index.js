import axios from 'axios';

export const FETCH_WEATHER = "FETCH_WEATHER";
export const CREATE_EVENT = "CREATE_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";
export const CHANGE_MONTH = "MONTH_CHANGED";
export const SELECT_SQUARE = "SELECT_SQUARE";

export function fetchWeather(){

    const fetchUrl = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22vancouver%2C%20bc%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
    const request = axios.get(fetchUrl);

    return {
        type: FETCH_WEATHER,
        payload: request
    };
}

export function createEvent(event){
    return {
        type: CREATE_EVENT,
        payload: event // TO CORROBORATE
    }
}

export function deleteEvent(event){
    return {
        type: DELETE_EVENT,
        payload: event // TO CORROBORATE
    }
}

export function changeMonth(newMonthMoment){
    return {
        type: CHANGE_MONTH,
        payload: newMonthMoment
    }
}

export function selectSquare(selectedDayMoment){
    return {
        type: SELECT_SQUARE,
        payload: selectedDayMoment
    }
}