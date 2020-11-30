import React from 'react';
import './App.css';
import Routes from './routes';
import { GlobalStyled } from './styles/global';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
require('dotenv').config();

library.add(fab, faCheckSquare, faCoffee, faBars, faTimes);

const App = () =>( <div className="App"><GlobalStyled/><Routes /></div> ); 
export default App;
