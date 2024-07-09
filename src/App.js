import {React, useState, useEffect, useRef} from "react"
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
  const currentUser = useRef(null)
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

  function handleSubmit(newProj){
    fetch("http://localhost:4000/projects",{
      method:"POST",
      headers:{
        "Content-Type": "Application/json"
      },
      body: JSON.stringify(newProj)
    })
    .then(r=>r.json())
    .then(data=>{
      const newArr = [...projectData,data]
      setProjectData(newArr)
    })
  }

  function handleEdit(id,edit){
    fetch(`http://localhost:4000/projects/${id}`,{
    method:'PATCH',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(edit)
    })
    .then(r=>r.json())
    .then(data=> {
        const newArray=[...projectData]
        newArray[id-1] = data
        setProjectData(newArray)
    })
}

  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <Home/>
      }/>
      <Route path="/login" element={
        <Login user={user} setUser={setUser} setUserData={setUserData} password={password} setPassword={setPassword} userData={userData} landscapeData={landscapeData} currentUser={currentUser}/>
      }/>
      <Route path="/landscaper" element={
        <Landscaperpage/>
      }/>
      <Route path="/user" element={
        <Userpage handleSubmit={handleSubmit} currentUser={currentUser} setUser={setUser} projectData={projectData} landscapeData={landscapeData} handleEdit={handleEdit}/>
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
