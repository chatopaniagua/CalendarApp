import { SELECT_SQUARE } from '../actions';
import moment from 'moment';

export default function(state = moment(), action){

    switch(action.type){
        case SELECT_SQUARE:
            return action.payload
        default:
            return state;
    }

}