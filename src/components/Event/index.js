import React from 'react';
import './event.css';

export default (props) => {

    const { event, showDelete, onEventDeleted } = props;
    const classes = `event event-${event.type.toLowerCase()}`;

    return (
        <div className={classes} key={event.id}>
            <div className="event-icon"></div>
            <div className="event-name">{event.name}</div>
            { showDelete && 
                <div className="event-delete" title="Delete event" onClick={() => onEventDeleted(event)}>&times;</div>
            }
        </div>
    )

}