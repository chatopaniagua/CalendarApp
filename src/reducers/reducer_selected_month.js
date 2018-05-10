import { CHANGE_MONTH } from '../actions';
import moment from 'moment';

export default function(state = moment(), action){

    switch(action.type){
        case CHANGE_MONTH:
            return action.payload
        default:
            return state;
    }

}