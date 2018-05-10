import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { changeMonth } from '../../actions';
import CalendarSquare from '../CalendarSquare/';

import leftArrow from './left-arrow.svg';
import rightArrow from './right-arrow.svg';

import './calendar.css';

class Calendar extends Component {

    constructor(props){
        super(props);
        this.weekdays = moment.weekdays().map(w => w.substring(0,1));
    }

    componentDidMount(){
        document.addEventListener('keydown', this.onKeyDown);
    }

    componentWillUnmount(){
        document.removeEventListener('keydown', this.onKeyDown);
    }
    
    renderDays(){
        return this.getDaysToShow().map( (day) => {
            return <CalendarSquare moment={day} key={day.valueOf()}/>
        })
    }

    getDaysToShow(){
        // Setup
        let daysOfThisMonth = [];
        const totalSquares = 42; // 6 X 7
        const daysInCurrentMonth = this.props.activeMonth.clone().daysInMonth();
        const firstDayOfMonth = this.props.activeMonth.clone().startOf('month');

        // Get number of empty squares
        const emptySquaresAtTheBeginning = firstDayOfMonth.format('d'); // 0 = Sunday, 1 = Monday .. 6 = Saturday
        const emptySquaresAtTheEnd = totalSquares - daysInCurrentMonth - emptySquaresAtTheBeginning;

        // Get days from previous month
        for ( let i = emptySquaresAtTheBeginning; i > 0; i--){
            const day = firstDayOfMonth.clone().subtract(i,'days');
            daysOfThisMonth.push(day);
        }

        // Get days of current month
        for( let i = 1; i <= daysInCurrentMonth; i++){
            const day = firstDayOfMonth.clone().date(i);
            daysOfThisMonth.push(day);
        }

        // Get days from next month
        for ( let i = 1; i <= emptySquaresAtTheEnd; i++){
            const day = firstDayOfMonth.clone().endOf('month').startOf('day').add(i,'days');
            daysOfThisMonth.push(day);
        }

        return daysOfThisMonth;
    }

    nextMonth = () => {
        this.props.changeMonth( this.props.activeMonth.clone().add(1,'month'));
    }

    previousMonth = () => {
        this.props.changeMonth( this.props.activeMonth.clone().subtract(1,'month'));
    }

    onKeyDown = (e) => {
        switch( e.keyCode || e.which){
            case 37:
                this.previousMonth(); break;
            case 39:
                this.nextMonth(); break;
            default:
                break;
        }
    }

    render(){
        return (
            <div>
                <div className="calendar-container">
                    <div className="calendar">

                        {/* HEADER */}
                        <div className="calendar-header">
                            <div className="previous-month-arrow">
                                <img onClick={this.previousMonth} src={leftArrow} alt=""/>
                            </div>
                            <h1 className="calendar-date-title">
                                {this.props.activeMonth.format('MMMM YYYY')}
                            </h1>
                            <div className="next-month-arrow">
                                <img onClick={this.nextMonth} src={rightArrow} alt=""/>
                            </div>
                        </div>

                        {/* WEEKDAYS HEADINGS */}
                        <div className="calendar-weekdays-headings">
                            {this.weekdays.map( ( name , i ) => {
                                return <div key={ name + i }>{name}</div>;
                            })}
                        </div>

                        {/* CALENDAR BODY */}
                        <div className="calendar-body noselect">
                            {this.renderDays()}
                        </div>

                    </div>
                </div>
                <hr/> 
                <div className="calendar-instructions">
                    <li>Click on a day to select it.</li>
                    <li>Double-click on a day to go to its page.</li>
                    <li>Click on the arrows at the top of the calendar or use your keyboard arrow keys to move between months</li>
                    <li>Weather icons by <a href="https://www.flaticon.com/authors/yihsuanlu">Yihsuanlu</a> and <a href="https://www.flaticon.com/authors/dario-ferrando">Dario Fernando</a>.</li>
                    <li>Created by <a href="https://github.com/chatopaniagua">Joaquin Paniagua</a>.</li>
                </div>
                <hr/>
                
            </div>
        )
    }

}

function mapStateToProps({ activeMonth}){
    return {
        activeMonth 
    }; 
}

export default connect(mapStateToProps, { changeMonth } )(Calendar);
