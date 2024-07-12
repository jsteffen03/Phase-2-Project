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
  const [filteredPlants, setFilteredPlants] = useState([])
  const [userData, setUserData] = useState([])
  const [landscapeData, setLandscapeData] = useState([])
  const [projectData, setProjectData] = useState([])
  const [user, setUser] = useState("")
  const currentUser = useRef(null)
  const [password, setPassword] = useState("")
  const [displayNotes, setDisplayNotes] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [displayCode, setDisplayCode] = useState("")
  const [displayShrubs, setDisplayShurbs] = useState([])
  const [displayTrees, setDisplayTrees] = useState([])
  const [displayLandscaper, setDisplayLanscaper] = useState([])
  const [totalPlants, setTotalPlants] = useState("")
  const [totalShrubs, setTotalShrubs] = useState("")
  const [totalTrees, setTotalTrees] = useState("")
  const [editedNotes, setEditedNotes] = useState(displayNotes)


  useEffect(()=>{
    fetch("http://localhost:4000/plants")
    .then(r=>r.json())
    .then(data=>{
      setPlants(data);
      setFilteredPlants(data);
     })
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

  function handleDelete(id){
    fetch(`http://localhost:4000/projects/${id}`,{
    method:'DELETE'
    })
    .then(r=>r.json())
    .then(data=> console.log("Deleted: ",data))
    const notRemoved = projectData.filter(project=>{
        if(project.id === id){
            return false
        }
        return true
    })
    setProjectData(notRemoved)
    setDisplayName("")
  }

  function addPlant(newPlant){
    fetch("http://localhost:4000/plants",{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(newPlant)
    })
    .then(r=>r.json())
    .then(data=> setPlants([...plants,data]))
  }

  function handlePlantToProject(correctProject, updatedProj){
    fetch(`http://localhost:4000/projects/${correctProject}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedProj)
    })
    .then(r => r.json())
    .then(updatedData => {
      const updatedProjectData = projectData.map(project => {
        if (project.id === correctProject) {
          return updatedData; 
        }
        return project; 
      });
      setProjectData(updatedProjectData);
      alert("Added to Project"); 
    })
  }

  return (
    <div className="body2">
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
          <Userpage handleSubmit={handleSubmit} 
          currentUser={currentUser} setUser={setUser} 
          projectData={projectData} setProjectData={setProjectData}
          landscapeData={landscapeData} 
          handleEdit={handleEdit} 
          handleDelete={handleDelete} 
          displayNotes={displayNotes} setDisplayNotes={setDisplayNotes}
          displayName={displayName} setDisplayName={setDisplayName} 
          displayShrubs={displayShrubs} setDisplayShurbs={setDisplayShurbs}
          displayTrees={displayTrees} setDisplayTrees={setDisplayTrees}
          displayLandscaper={displayLandscaper} setDisplayLanscaper={setDisplayLanscaper}
          totalPlants={totalPlants} setTotalPlants={setTotalPlants}
          totalShrubs={totalShrubs} setTotalShrubs={setTotalShrubs}
          totalTrees={totalTrees} setTotalTrees={setTotalTrees}
          editedNotes={editedNotes} setEditedNotes={setEditedNotes}
          displayCode={displayCode} setDisplayCode={setDisplayCode}
          />
        }/>
        <Route path="/user/search" element={
          <Search plants={plants} addPlant={addPlant} setFilteredPlants={setFilteredPlants} filteredPlants={filteredPlants} displayCode={displayCode} projectData={projectData} handlePlantToProject={handlePlantToProject} setProjectData={setProjectData} setDisplayName={setDisplayName}/>
        }/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
