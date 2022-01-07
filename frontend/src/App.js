import React from "react";
import {Routes, BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from "./components/navbar";
import BugsList from "./components/bugs-list";
import EditBug from "./components/edit-bug";
import CreateBug from "./components/create-bug";
import CreateUser from "./components/create-user";

function App() {
  return (
    <Router>
      <Navbar/>
      <br/>
      <Routes>
        <Route path="/" exact element={<BugsList/>}/>
        <Route path="/edit/:id" element={<EditBug/>}/>
        <Route path="/create" element={<CreateBug/>}/>
        <Route path="/user" element={<CreateUser/>}/>
      </Routes>
    </Router>
  );
}

export default App;
