import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Users from './components/Users';
import RegisterForm from './components/RegisterForm';


function App() {
  
  return (
    <div className="App">
      <Route path="/login" component={LoginForm} /> 
      <Route path="/users" component={Users} />
      <Route path="/register" component={RegisterForm} />
    </div>
  );
}

export default App;
