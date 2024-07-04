import {React, useState, useEffect} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import Home from "./components/Home";
import Login from "./components/Login";
import Landscaperpage from "./components/landscapepage";
import Userpage from "./components/Userpage";
import Search from "./components/Search";

function App() {

  const [plants, setPlants] = useState([])
  const [userData, setUserData] = useState([])
  const [landscapeData, setLandscapeData] = useState([])
  const [projectData, setProjectData] = useState([])
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")

  useEffect(()=>{
    fetch("https://perenual.com/api/species-list?key=sk-9AFw6684d830513f76129")
    .then(r=>r.json())
    .then(data=>setPlants(data))
    }
  ,[])

  useEffect(()=>{
    fetch("http://localhost:4000/users")
    .then(r=>r.json())
    .then(data=>setUserData(data))
    }
  ,[])

  useEffect(()=>{
    fetch("http://localhost:4000/landscapers")
    .then(r=>r.json())
    .then(data=>setLandscapeData(data))
    }
  ,[])

  useEffect(()=>{
    fetch("http://localhost:4000/projects")
    .then(r=>r.json())
    .then(data=>setProjectData(data))
    }
  ,[])
  
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <Home/>
      }/>
      <Route path="/login" element={
        <Login user={user} setUser={setUser} password={password} setPassword={setPassword}/>
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
