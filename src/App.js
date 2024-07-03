import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import Home from "./components/Home";
import Login from "./components/Login";
import Landscaperpage from "./components/landscapepage";
import Userpage from "./components/Userpage";
import Search from "./components/Search";

function App() {



fetch(`https://perenual.com/api/species-list?key=sk-9AFw6684d830513f76129`)
.then(r=>r.json())
.then(plants => {console.log(plants)})

  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <Home/>
      }/>
      <Route path="/login" element={
        <Login/>
      }/>
      <Route path="/landscaper" element={
        <Landscaperpage/>
      }/>
      <Route path="/user" element={
        <Userpage/>
      }/>
      <Route path="/user/search" element={
        <Search/>
      }/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
