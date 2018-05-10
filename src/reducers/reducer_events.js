import { CREATE_EVENT, DELETE_EVENT } from '../actions';
import _remove from 'lodash.remove';
import dayIdGenerator from '../utils/day_id_generator';

export default function(state = {}, action){

    let dayId, eventsOfDay, newState;

    switch(action.type){

        case CREATE_EVENT:
            const eventToCreate = action.payload;
            dayId = dayIdGenerator(eventToCreate.moment);
            eventsOfDay = state[dayId];
            return { 
                ...state,
                [dayId]: eventsOfDay && eventsOfDay.length ? 
                    [ action.payload, ...eventsOfDay] : 
                    [ eventToCreate ],
            };


        case DELETE_EVENT:
            const eventToDelete = action.payload;
            dayId = dayIdGenerator( eventToDelete.moment );
            eventsOfDay = state[dayId];
            return {
                ...state,
                [dayId]: eventsOfDay && eventsOfDay.length ?  
                    _remove(eventsOfDay, e => e.id !== eventToDelete.id) : 
                    []
            };

        default:
            return state;
    }

}