import express from 'express';
import React from 'react';
import ReactServer from 'react-dom/server';
import App from '../client/components/App';
import fs from 'fs';

let router = express.Router();


router.get('*', (req, res) => {
  let initialState = {}; //Set the initial state of the app
  initialState.peopleList = JSON.parse(fs.readFileSync('People.json', {encoding: 'utf8'}));
  let Content = ReactServer.renderToString( // Generates a HTML string with the rendered react component(s)
    <App peopleList={initialState.peopleList}/>
  );

  //Using handlebars to inject the rendered component(s) and state into the HTML. A template engine isn't required.
  res.render('index', {ServerSideRender: Content , state: JSON.stringify(initialState)});
});

module.exports = router;
