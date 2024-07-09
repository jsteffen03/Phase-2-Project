import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { FormField, Button, Form } from 'semantic-ui-react'

function Userpage({handleSubmit, currentUser, setUser, projectData, landscapeData, handleEdit}){

    const [toggleEdit,setToggleEdit] = useState(false)
    const [name, setName] = useState("")
    const [notes, setNotes] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [displayNotes, setDisplayNotes] = useState("")
    const [id, setId] = useState("")
    const [displayShrubs, setDisplayShurbs] = useState([])
    const [displayTrees, setDisplayTrees] = useState([])
    const [displayLandscaper, setDisplayLanscaper] = useState([])
    const [totalPlants, setTotalPlants] = useState("")
    const [totalShrubs, setTotalShrubs] = useState("")
    const [totalTrees, setTotalTrees] = useState("")
    const [editedNotes, setEditedNotes] = useState(displayNotes)
    const navigate = useNavigate()

    function addProject(e){
        e.preventDefault()
        const newProj = {
            projectName: name,
            user: currentUser.current,
            landscaper: [],
            projectNotes: notes,
            plants: []
        }
        handleSubmit(newProj)
        setName('');
        setNotes('');    
    }

    function logOut(){
        setUser("")
        currentUser = ""
        navigate("/")
    }

    const filteredProject = projectData.filter(project=>{
        if(project.user === currentUser.current){
            return true
        }
        return false
    })

    const projects = filteredProject.map(project=>{
        return <div key={project.id} onClick={()=>displayProject(project)} project={project} >{project.projectName} - Code: {project.id} </div>
    })

    function displayProject(project){
        const shrubs = project.plants.filter(plant => plant.type === 'shrub');
        const trees = project.plants.filter(plant => plant.type === 'tree');
        const landscapers = landscapeData.filter(landscaper => project.landscaper.includes(landscaper.id));        
        setDisplayTrees(trees)
        setDisplayShurbs(shrubs)
        setTotalShrubs(shrubs.length)
        setTotalTrees(trees.length)
        setTotalPlants(trees.length + shrubs.length)
        setId(project.id)
        setDisplayName(project.projectName)
        setDisplayNotes(project.projectNotes)
        setDisplayLanscaper(landscapers) 
    }

    function handleClick(){
        setToggleEdit(true)
        setEditedNotes(displayNotes)
    }

    function edit(){
        const editedProj = {
            projectNotes: editedNotes
        }
        handleEdit(id , editedProj)
        setDisplayNotes(editedNotes)
        setToggleEdit(false)
    }

    return(
        <div className="container">
            <div className="Header"> 
                <h1>My Landscaper</h1>
                <div>
                    <Button color="black" onClick={logOut}>Log Out</Button> 
                </div>
            </div> 
            <div className="Content">
                <div className="MyProjects">
                    <h3>My Projects</h3>
                    {projects}
                    <Form onSubmit={(e)=>console.log(e)}>
                        <h2>New Project</h2> 
                        <Button color='black' onClick={(e)=>addProject(e)}>Submit</Button>
                        <FormField>
                            <label>Project Name</label>
                            <input type="text" value={name} placeholder="Project Name" onChange={(e)=>setName(e.target.value)}></input>
                        </FormField>
                        <FormField>
                            <label>Project Details</label>
                            <input type="text" value={notes} placeholder="Project Details" onChange={(e)=>setNotes(e.target.value)}></input>
                        </FormField>
                    </Form>
                </div>
                <div className="ProjectPlants">
                    {!(displayName === "") ? <h2 className="About" >Project: {displayName} - Code: {id}</h2>: <h2 className="About" >No Project Selected</h2>}
                    <h3>Project Plants</h3>
                    <h3>Total: {totalPlants}</h3>
                    <h4>Shrubs</h4>
                    <h4>Total: {totalShrubs}</h4>
                    {displayLandscaper && displayLandscaper.length > 0 ? (
                    <ul>
                        {displayShrubs.map((shrub, index) => (
                            <li key={index}>{shrub.plantName}</li>
                        ))}
                    </ul>
                    ) : 
                    <p>No Shrubs selected for this project</p>}             
                    <h4>Trees:</h4>
                    <h4>Total: {totalTrees}</h4>
                    {displayLandscaper && displayLandscaper.length > 0 ? (
                    <ul>
                        {displayTrees.map((tree, index) => (
                            <li key={index}>{tree.plantName}</li>
                        ))}
                    </ul>
                    ) : 
                    <p>No Trees selected for this project</p>} 
                    <h3>Landscape Companies</h3>
                    {displayLandscaper && displayLandscaper.length > 0 ? (
                    <ul>
                        {displayLandscaper.map((landscaper, index) => (
                            <li key={index}>{landscaper.username}</li>
                        ))}
                    </ul>
                    ) : 
                    <p>No Landscapers can see this project</p> }
                    <div className="Button">
                        <Button color='green' onClick={()=>navigate("/user/search")}>Search Plants</Button>
                    </div>
                </div>
                <div className="ProjectNotes">
                    <h3>Project Notes</h3>
                    <Button color="black" onClick={()=>handleClick()}>Edit Notes</Button>
                    { 
                        toggleEdit ? 
                        <Form  onSubmit={(e)=>edit(e)}>
                            <FormField>
                                <input type="text" value={editedNotes} onChange={(e) => setEditedNotes(e.target.value)}/>
                            </FormField>
                            <Button type="submit">Save</Button>
                        </Form>
                        :
                        <p>{displayNotes}</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Userpage;        

 