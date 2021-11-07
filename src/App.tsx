import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Redirect from "react-router";
import BasicCard from "./views/login/BasicCard"
import Lists from "./views/lists"
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<BasicCard />} />
        <Route path="/lists" element={<Lists />} />
      </Routes>
    </Router>
  );
}
 
export default App;
