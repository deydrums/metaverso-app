import React from 'react';
import ReactDOM from 'react-dom';
import { MetaversoApp } from './MetaversoApp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import './styles/styles.scss';

//console.log(process.env.REACT_APP_API_URL);
ReactDOM.render(
    <MetaversoApp />,
  document.getElementById('root')
);
