import React, { Component } from 'react';
import promise from 'redux-promise';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import Calendar from './components/Calendar/';
import DayView from './components/DayView/';
import ErrorPage from './components/ErrorPage/';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class App extends Component {
  
  render() {
    return ( 
      <div className="App">
        <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter >
            <Switch>
              <Route exact path="/:y/:m/:d" component={DayView}/>
              <Route exact path="/" component={Calendar}/>
              <Route path="" component={ErrorPage}/>
            </Switch>
        </BrowserRouter>
      </Provider>
      </div>
    );
  }
}

export default App;
