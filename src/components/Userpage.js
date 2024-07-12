import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { FormField, Button, Form } from 'semantic-ui-react'
import '../styles.css';

function Userpage({handleSubmit, currentUser, setUser, projectData, landscapeData, handleEdit, handleDelete, setDisplayCode, displayCode, displayName, setDisplayName, setDisplayNotes, displayNotes}){
    //declaring states
    const [toggleEdit,setToggleEdit] = useState(false)
    const [name, setName] = useState("")
    const [notes, setNotes] = useState("")
    const [id, setId] = useState("")
    const navigate = useNavigate()
    //declaring display states
    const [displayShrubs, setDisplayShurbs] = useState([])
    const [displayTrees, setDisplayTrees] = useState([])
    const [displayLandscaper, setDisplayLanscaper] = useState([])
    const [totalPlants, setTotalPlants] = useState("")
    const [totalShrubs, setTotalShrubs] = useState("")
    const [totalTrees, setTotalTrees] = useState("")
    const [editedNotes, setEditedNotes] = useState(displayNotes)

    function addProject(e){ // function to add a new project to data
        e.preventDefault()
        const newProj = {
            projectName: name,
            user: currentUser.current,
            landscaper: [],
            projectNotes: notes,
            plants: [{
                common_name: "",
                scientific_name: "'",
                type: "",
                image: ""
            }]
        }
        handleSubmit(newProj)
        setName('');
        setNotes('');    
    }

    function logOut(){ // function to log out and go back to login page
        setUser("")
        currentUser = ""
        navigate("/login")
    }

    const filteredProject = projectData.filter(project=>{ // function to filter through projects and find the ones that are attatched to the filter.
        if(project.user === currentUser.current){
            return true
        }
        return false
    })

    const projects = filteredProject.map(project=>{ //map function to show each project name
        return <div key={project.id} onClick={()=>displayProject(project)} project={project} >{project.projectName} - Code: {project.id} </div>
    })

    function displayProject(project){ // function that on click displays the project that was clicked
        const shrubs = project.plants.filter(plant => plant.type === 'Shrub');
        const trees = project.plants.filter(plant => plant.type === 'Tree');
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
        setDisplayCode(project.id)
    }

    function handleClick(){ //handles the status of editing the notes
        setToggleEdit(true)
        setEditedNotes(displayNotes)
    }

    function edit(){ // handles the edit of the notes
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
                    <Button color="black" onClick={(e)=>{logOut(e);setDisplayName("")}}>Log Out</Button> 
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
                    {!(displayName === "") ? <h2 className="About" >Project: {displayName} - Code: {displayCode}</h2>: <h2 className="About" >No Project Selected</h2>}
                    <h3>Project Plants</h3>
                    <h3>Total: {totalPlants}</h3>
                    <h4>Shrubs</h4>
                    <h4>Total: {totalShrubs}</h4>
                    {displayName && displayShrubs && displayShrubs.length > 0 ? (
                    <ul>
                        {displayShrubs.map((shrub, index) => (
                            <li key={index}>{shrub.common_name}</li>
                        ))}
                    </ul>
                    ) : 
                    <p>No Shrubs selected for this project</p>}             
                    <h4>Trees:</h4>
                    <h4>Total: {totalTrees}</h4>
                    {displayName && displayTrees && displayTrees.length > 0 ? (
                    <ul>
                        {displayTrees.map((tree, index) => (
                            <li key={index}>{tree.common_name}</li>
                        ))}
                    </ul>
                    ) : 
                    <p>No Trees selected for this project</p>} 
                    <h3>Landscape Companies</h3>
                    {displayName &&  displayLandscaper && displayLandscaper.length > 0 ? (
                    <ul>
                        {displayLandscaper.map((landscaper, index) => (
                            <li key={index}>{landscaper.username}</li>
                        ))}
                    </ul>
                    ) : 
                    <p>No Landscapers can see this project</p> }
                    <div className="Button">
                        <Button color='green' onClick={() => {if (displayName === "") {alert("Please Select Project")} else {navigate("/user/search")}}}>
                            Search Plants
                        </Button>
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
                        <p>{ displayName ? displayNotes :"No Project displayed"}</p>
                    }
                    <Button color="red" onClick={()=>(handleDelete(id))}>Delete Project</Button>
                </div>
            </div>
        </div>
    )
}

export default Userpage;        

 