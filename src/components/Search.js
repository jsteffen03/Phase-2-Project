import PlantCard from './plantCard';
import { Button, Card, Form, FormField, FormSelect } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom"
import { useState } from 'react';

function Search({plants, addPlant, filteredPlants, setFilteredPlants, displayCode, projectData, handlePlantToProject, setProjectData, setDisplayName}){

    //declaring states for search function
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("")
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [scName, setScName] = useState("")
    const [type , setType] = useState("")
    const [image, setImage] = useState("")

    function handleSearch(e){ // function to filter plantrs either by serach bar or drop down or both
        e.preventDefault()
        setFilteredPlants(plants.filter((plant)=>{
            if (search === "" && filter === "") {
                return true;
              }
            
              if (search !== "" && plant.common_name.toLowerCase().includes(search.toLowerCase())) {
                if (filter === "" || plant.type === filter) {
                  return true;
                }
                return false;
              }
            
              if (filter !== "" && plant.type === filter) {
                if (search === "" || plant.common_name.toLowerCase().includes(search.toLowerCase())) {
                  return true;
                }
                return false;
              }
            
              return false;
        }))
    }

    function submit(e){ // function to add a new plant 
        e.preventDefault()
        const newPlant = {
            common_name: name,
            scientific_name: scName,
            type: type,
            image: image
        }
        addPlant(newPlant)
        setName("")
        setScName("")
        setType("")
        setImage("")
      }

    function plantToProject(correctPlant){ //function to send a plant to current project
        const correctProject = projectData.filter((project)=>{
            if(project.id === displayCode){
                return true
            } 
            return false
        })

        correctProject.forEach((project) => { 
            const newPlants = [...project.plants, correctPlant]
            const updatedProj = {
                projectName: project.projectName,
                user: project.user,
                landscaper: project.landscaper,
                projectNotes: project.projectNotes,
                plants: newPlants
            }
            setProjectData(updatedProj)
            handlePlantToProject(project.id, updatedProj)
        })
 
    }

    const plantRender = filteredPlants.map((plant)=>{ // function to map through plant data and display a card for each
        return <PlantCard key={plant.id} plant = {plant} name={plant.common_name} scName={plant.scientific_name} type={plant.type} img={plant.image} plantToProject={plantToProject}/>
    })
  
    const options = [ // variable to fill the drop down
        { key: 'a', text: '--Select--', value: '' },
        { key: 't', text: 'Tree', value: 'Tree' },
        { key: 's', text: 'Shrub', value: 'Shrub' }
    ]

    return(
        <div className="container">
            <div className="Header"> 
                <h1>My Landscaper</h1>
                <div>
                    <Button color="black" onClick={(e) => {navigate("/user");setDisplayName("")}}>Back to Projects</Button> 
                </div>
            </div> 
            <div className="Content2">
                <div className="addPlant">
                    <Form onSubmit={(e)=>handleSearch(e)}>
                        <h2>Search</h2> 
                        <Button color='black' type="submit" >Search</Button>
                        <FormField>
                            <label>Plant Name</label>
                            <input type="text" placeholder="Plant Name" onChange={(e)=>setSearch(e.target.value)}></input>
                        </FormField>
                        <FormSelect onChange={(e, { value })=>setFilter(value)}
                            fluid
                            label='Select Type'
                            options={options}
                            placeholder='--Select--'    
                        />
                    </Form>
                    <div>
                    <Form onSubmit={(e)=>submit(e)}>
                        <h3>Can't find a plant? Add one here!</h3> 
                        <Button color='black'>Add Plant</Button>
                        <FormField>
                            <label>Plant Name</label>
                            <input type="text" placeholder="Plant Name" onChange={(e)=>setName(e.target.value)}></input>
                        </FormField>
                        <FormField>
                            <label>Scientific Name</label>
                            <input type="text" placeholder="Plant Name" onChange={(e)=>setScName(e.target.value)}></input>
                        </FormField>
                        <FormSelect onChange={(e, { value })=>setType(value)}
                            fluid
                            label='Select Type'
                            options={options}
                            placeholder='--Select--'    
                        />
                        <FormField>
                            <label>Plant Image</label>
                            <input type="text" placeholder="Plant Name" onChange={(e)=>setImage(e.target.value)}></input>
                        </FormField>
                    </Form>
                    </div>
                </div>
                <div className="plants">
                    <h2>Browse Plants</h2>
                    <Card.Group itemsPerRow={6}>
                        {plantRender}    
                    </Card.Group>
                </div>
            </div>
        </div>
    )
}
export default Search;