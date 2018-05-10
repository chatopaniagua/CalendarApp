import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createEvent } from '../../actions';
import moment from 'moment';

import './event-creator.css';

class EventCreator extends Component {

    onSubmit(values){
        const { createEvent, onEventCreated } = this.props;
        createEvent({
            ...values,
            moment: this.props.moment,
            id: moment().valueOf() 
        });
        if(typeof(onEventCreated) === "function"){
            onEventCreated();
        }
    }

    render(){
        const { handleSubmit } = this.props;

        return (
        <form id="new-event-form" className="form-horizontal" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            
            <Field 
                label="Event name"
                name="name"
                component={this.CustomInputField}/>

           <div className="form-group">
                <label className="col-xs-4">Type</label>
                <div className="col-xs-8">
                <label><Field name="type" component="input" type="radio" value="Meeting"/> Meeting</label><br/>
                <label><Field name="type" component="input" type="radio" value="Appointment"/> Appointment</label><br/>
                <label><Field name="type" component="input" type="radio" value="Task"/> Task</label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary">Create</button> 
            { this.props.showCancel && 
                 <button className="btn btn-danger" onClick={() => this.props.onCancel()}>Cancel</button>
            }
        </form>
        )
    }

    CustomInputField(props){
        const { touched, error } = props.meta
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label className="col-xs-4">{props.label}</label>
                <div className="col-xs-8">
                    <input 
                        className="form-control"
                        type="text"
                        {...props.input}
                    />
                    <div className="text-help">
                        {touched ? error : ""}
                    </div>
                </div>
            </div>
        )
    }


}



function validate(values){
    const errors = {};

    // Validate the inputs values
    if(!values.name){
        errors.name = "You need to specify a name for the event";
    }

    if(values.name && values.name.length < 3){
        errors.name = "The event name must contain at least 3 characters";
    }

    if(!values.type){
        errors.type = "You need to specify an event type";
    }

    return errors; // If errors is empty the form is fine, otherwise form is invalid
}

const mapStateToProps = (state) => {
    return {
        initialValues: { type: "Meeting" }
    }
}

const enhancers = compose(
    connect(mapStateToProps, {  createEvent } ),
    reduxForm({
        validate,
        form: 'CreateEventForm'
    })
);

export default enhancers(EventCreator);