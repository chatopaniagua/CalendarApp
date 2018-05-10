import React, { Component } from 'react';
import WeatherDescription from '../WeatherDescription';
import './day-weather-info.css';

class DayWeatherInfo extends Component{

    hasExpandedInfo(){;
        return this.props.weather.condition !== undefined;
    }

    hasForecastInfo(){
        return this.props.weather.forecast !== undefined;
    }

    render(){

        const { weather } = this.props;

        if(!weather){
            return <div>No weather info available for this day</div>
        }

        return (
            <div className="day-weather-info">

                { this.hasExpandedInfo() && 
                <div>
                    <WeatherDescription temp={weather.condition.temp } description={weather.condition.text} />
                    <hr/>
                    <dl className="dl-horizontal">

                        <dt>Sunrise</dt>
                        <dd>{weather.astronomy.sunrise}</dd>

                        <dt>Sunset</dt>
                        <dd>{weather.astronomy.sunset}</dd>

                        <dt>Humidity</dt>
                        <dd>{weather.atmosphere.humidity} %</dd>

                        <dt>Pressure</dt>
                        <dd>{weather.atmosphere.pressure} {weather.units.pressure}</dd>

                        <dt>Wind speed</dt>
                        <dd>{weather.wind.speed} {weather.units.speed}</dd>

                        <dt>Wind direction</dt>
                        <dd>{weather.wind.direction}&deg;</dd>


                    </dl>
                </div>
                }


                { this.hasForecastInfo() && 
                <div>
                    {(this.hasExpandedInfo() ? "" : <WeatherDescription description={weather.forecast.text} />)}
                    <hr/>
                    <dl className="dl-horizontal">

                        <dt>High temp.</dt>
                        <dd>{weather.forecast.high}&deg;</dd>
                        
                        <dt>Low temp.</dt>
                        <dd>{weather.forecast.low}&deg;</dd>

                    </dl>
                </div>
                }


            </div>
        )
    }
}

export default DayWeatherInfo;