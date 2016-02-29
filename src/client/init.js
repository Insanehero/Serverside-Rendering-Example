import React from 'react';
import { render } from 'react-dom';

//Components to import
import App from './components/App';

//Grab the initial state set by the server.
const initialState = window.INITIAL_STATE


//Comment out the lines below and then run the app again, will anything get rendered?
render((
  <App peopleList={initialState.peopleList}/>
),
  document.getElementById('root')
);
