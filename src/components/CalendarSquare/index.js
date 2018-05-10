import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { selectSquare, changeMonth } from '../../actions';
import Event from '../Event';

import dayIdGenerator from '../../utils/day_id_generator';
import './calendar_square.css';

class CalendarSquare extends Component{

    getEvents = () => {
        const dayId = dayIdGenerator(this.props.moment);
        return this.props.events[dayId];
    }

    goToDate = () => {
        const url = this.props.moment.format("/YY/MM/DD");
        this.props.history.push(url);
    }

    isSelected(){
        return this.props.moment.isSame(this.props.selectedDay,'day');
    }

    isFromActiveMonth(){
        return this.props.moment.isSame(this.props.activeMonth,'month');
    }

    isToday(){
        return this.props.moment.isSame(new Date(), "day");
    }
    
    onClick = (e) => {
        
        const { moment, changeMonth, selectSquare } = this.props;
        
        selectSquare(moment);
        
        if(!this.isFromActiveMonth()){
            changeMonth(moment);
        }

    }
    
    onDoubleClick = (e) => {
        this.goToDate();
    }

    getElementClasses(){
        return "calendar-square "+  
        (!this.isFromActiveMonth() ? "other-month " : "") + // if this square belongs to other month
        (this.isToday() ? "today " : "") +  // if this square is today
        (this.isSelected() ? "selected " : ""); // if this square is selected
    }

    renderNumberOfEvents(){
        const events = this.getEvents();
        if(events && events.length){
            const desc = events.length > 1 ? "events" : "event";
            return events.length + " " + desc;
        }else{
            return "-"
        }
    }

    renderEvents(){
        const events = this.getEvents();
        if (events && events.length) {
            return events.map( event => {
                return <Event event={event} key={event.id}/>
            })
        }
    }

    render(){

        return (
            <div onClick={this.onClick} onDoubleClick={this.onDoubleClick} className={this.getElementClasses()}>

                <div className="calendar-square-header">
                    <div className="calendar-square-number">
                        {this.props.moment.format("D")}
                    </div>
                    <div className="calendar-square-title">
                        {this.renderNumberOfEvents()}
                    </div>
                </div>

                <div className="calendar-square-body">
                    <div className="calendar-square-events-list">
                        {this.renderEvents()}
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps( { selectedDay, events, activeMonth } ){
    return { selectedDay , events, activeMonth };
}

const componentEnhancers = compose(
    withRouter,
    connect(mapStateToProps, { selectSquare, changeMonth } )
);

export default componentEnhancers(CalendarSquare);