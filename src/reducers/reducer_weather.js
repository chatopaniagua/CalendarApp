import { FETCH_WEATHER } from '../actions';
import dayIdGenerator from '../utils/day_id_generator';
import moment from 'moment';

export default function(state = {}, action){

    switch(action.type){

        case FETCH_WEATHER:

            // Get info
            const { 
                astronomy,
                atmosphere,
                wind,
                item,
                units
            } = action.payload.data.query.results.channel;
            
            // condition info
            const dayWithConditionInfo = getMomentFromCondition(item.condition);
            const dayWithConditionInfoId = dayIdGenerator(dayWithConditionInfo);
            
            // forecast info
            const daysWithForecastInfo = {};
            for(var i = 0; i < item.forecast.length; i++){ 
                const f = item.forecast[i]; 
                const day = getMomentFromForecast(f);
                const dayId = dayIdGenerator(day);
                daysWithForecastInfo[dayId] = { forecast: f }
            }

            const thereIsDuplicateDay = daysWithForecastInfo[dayWithConditionInfoId] !== undefined;

            const result = { 
                ...daysWithForecastInfo,
                [dayWithConditionInfoId] : {
                    forecast: daysWithForecastInfo[dayWithConditionInfoId] ? 
                        daysWithForecastInfo[dayWithConditionInfoId].forecast : 
                        {},
                    condition: item.condition,
                    astronomy,
                    atmosphere,
                    wind,
                    units
                }
            };

            return result;

        default:
            return state;
    }



} 

function getMomentFromCondition(condition){
    const [ d, m, y] = condition.date.split(' ').splice(1,3);
    return moment(`${y}-${m}-${d}`, "YYYY-MMMM-DD"); 
}

function getMomentFromForecast(forecast){
    const [ d, m, y] = forecast.date.split(' ');
    return moment(`${y}-${m}-${d}`, "YYYY-MMMM-DD"); 
}   