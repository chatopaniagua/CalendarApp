// Libs
import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';

// Components
import DayWeatherInfo from '../DayWeatherInfo';
import EventCreator from '../EventCreator';
import Event from '../Event';

// Actions
import { fetchWeather, createEvent, deleteEvent } from '../../actions';

// Other
import dayIdGenerator from '../../utils/day_id_generator';
import './day_view.css';

class DayView extends Component {

    constructor(props){
        super(props);

        // Get day
        const { y,m,d } = this.props.match.params;
        const momentInstance = moment(`${y}${m}${d}`, "YYMMDD");

        this.moment = momentInstance;

        this.state = {
            showCreateEvent: false
        }
    }

    componentDidMount(){
        this.props.fetchWeather(); // Refresh weather info every time we open this view
    }

    getDayId(){
        return dayIdGenerator(this.moment.clone()); 
    }

    getWeather(){
        const weather = this.props.weather[this.getDayId()];
        return weather;
    }

    getEvents(){
        return this.props.events[this.getDayId()];
    }

    showCreateEvent(){
        this.setState({
            showCreateEvent: true,
            mexico: "hola"
        });
    }

    hideCreateEvent(){
        this.setState({
            showCreateEvent: false
        });
    }

    onEventDeleted = (event) => {
        // TO DO 
        this.props.deleteEvent(event);
    }

    renderEvents(){
        const events = this.getEvents();
        if(events && events.length){
            return events.map( event => {
                return <Event event={event} onEventDeleted={(e) => this.onEventDeleted(e)} showDelete={true} key={event.id}/>
            });
        }
    }

    renderYahooAttribution(){
        return (
            <div className="powered-by-yahoo">
                <a href="https://www.yahoo.com/?ilc=401" target="_blank" rel="noopener noreferrer"> 
                    <img src="https://poweredby.yahoo.com/purple.png" alt="Yahoo" width="134" height="29"/> 
                </a>
            </div>
        )
    }

    render(){
        return (
            <div className="day-view">
                <div className="day-view-header">
                    <h1 className="day-view-title">{this.moment.format("dddd, Do MMMM YYYY")}</h1>
                    <div className="day-header-buttons">
                        <Link to="/" className="btn btn-primary">Full Calendar</Link>
                    </div>
                </div> 
                <hr/>
                <div className="day-view-content">
                    <div className="day-weather">
                        <div className="day-view-section-title">Weather</div>
                        <DayWeatherInfo weather={this.getWeather()} />    
                        <hr/>
                        {this.renderYahooAttribution()}
                    </div>
                    <div className="day-events">
                        { !this.state.showCreateEvent && 
                            <div>
                                <div className="day-view-section-title">Events</div>
                                <div className="day-view-event-list">
                                    {this.renderEvents()}
                                </div>
                                <button id="create-event-button" className="btn btn-primary" onClick={() => this.showCreateEvent()}>New event</button>
                            </div>
                        }
                        { this.state.showCreateEvent && 
                            <div>
                                <div className="day-view-section-title">New event</div><hr/>
                                <EventCreator 
                                    moment={this.moment} 
                                    onEventCreated={() => this.hideCreateEvent()}
                                    showCancel={true}
                                    onCancel={() => this.hideCreateEvent()}/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

}

function mapStateToProps({ weather, events}){
    return { weather, events }; 
}


export default connect(mapStateToProps, { fetchWeather, createEvent, deleteEvent })(DayView);
