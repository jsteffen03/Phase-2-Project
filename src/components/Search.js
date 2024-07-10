import PlantCard from './plantCard';
import { Button, Card } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom"


function Search({plants}){

    const navigate = useNavigate()

    console.log(plants)

    console.log("why")

    const plantRender = plants.map((plant)=>{
        return <PlantCard id={plant.id} name={plant.common_name} scName={plant.scientific_name} type={plant.type} img={plant.image}/>
    })

    return(
        <div className="container">
            <div className="Header"> 
                <h1>My Landscaper</h1>
                <div>
                    <Button color="black" onClick={()=>navigate("/user")}>Back to Projects</Button> 
                </div>
            </div> 
            <div className="Content2">
                <div className="addPlant">
                    <h3>Add Plant</h3>
                </div>
                <div className="plants">
                    <Card.Group itemsPerRow={6}>
                        {plantRender}    
                    </Card.Group>
                </div>
            </div>
        </div>
    )
}
export default Search;