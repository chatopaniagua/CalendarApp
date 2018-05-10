import React from 'react';
import { Link }  from 'react-router-dom';

export default (props) => {
    return (
        <div className="jumbotron">
            <h2>Wrong URL address.</h2>
            <hr/>
            <Link to="/">Go back to main page?</Link>
        </div>
    );
};