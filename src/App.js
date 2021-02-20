import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import faker from 'faker';
import './App.css';
import Header from'./Component/Header';


const App =()=>{
  console.log(faker.commerce.productName())
    return (
      <div className="section">
        <Header/>
      </div>
    )
}

export default App;
