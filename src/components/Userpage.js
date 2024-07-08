import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { FormField, Button, Form } from 'semantic-ui-react'

function Userpage({handleSubmit, currentUser, setUser, projectData}){


    const [toggleEdit,setToggleEdit] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate()

    function handleEdit(){
        console.log("Gotcha")
    }


    function addProject(e){
        e.preventDefault()
        const newProj = {
            projectName: name,
            user: currentUser.current,
            landscaper: {
                id: ""
            },
            projectNotes: description,
            plants: []
        }
        handleSubmit(newProj)
        setName('');
        setDescription('');    
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
        return <div key={project.id} onClick={()=>displayProject(project)} >{project.projectName} - Code: {project.id} </div>
    })

    function displayProject(project){
        console.log(project)
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
                            <input type="text" value={description} placeholder="Project Details" onChange={(e)=>setDescription(e.target.value)}></input>
                        </FormField>
                    </Form>
                </div>
                <div className="ProjectPlants">
                    <h2 className="About" >Project:  - Code: 159</h2>
                    <h3>Project Plants</h3>
                    <h3>Total: 50</h3>
                    <h4>Shrubs</h4>
                    <h4>Total: 35</h4>
                    <ol>
                        <ul>shurb</ul>
                        <ul>shurb</ul>
                    </ol>    
                    <h4>Trees:</h4>
                    <h4>Total: 15</h4>
                    <div className="Button">
                        <Button color='green' onClick={()=>navigate("/user/search")}>Search Plants</Button>
                    </div>
                </div>
                <div className="ProjectNotes">
                    <h3>Project Notes</h3>
                    <Button color="black" onClick={()=>setToggleEdit(true)}>Edit Notes</Button>
                    { 
                        toggleEdit ? 
                        <Form onSubmit={(e)=>handleEdit(e)}>
                            <FormField >
                                <input placeholder="help"></input>
                            </FormField>
                        </Form>
                        :
                        <di>
                            <p>about</p>
                        </di>
                    }
                </div>
            </div>
        </div>
    )
}

export default Userpage;        

 