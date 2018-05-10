import React, { Component } from 'react';
import './weather-description.css';

export default class WeatherDescription extends Component{

    renderTemperature(){
        if ( this.props.temp !== undefined){
            return <span>{this.props.temp}&deg; </span>;
        }
    }

    render(){
        return (
            <div>
                <img className="weather-icon" src={"/weather_icons/"+this.props.description+".svg"} alt={this.props.description}/>
                <h1>
                    {this.renderTemperature()}
                    <small>{this.props.description}</small>
                </h1>
            </div>
        )
    }

}
