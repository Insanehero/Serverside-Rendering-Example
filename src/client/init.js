import React from 'react';
import { render } from 'react-dom';

//Components to import
import App from './components/App';

//Grab the initial state set by the server.
const initialState = window.INITIAL_STATE

render((
  <App peopleList={initialState.peopleList}/>
),
  document.getElementById('root')
);
