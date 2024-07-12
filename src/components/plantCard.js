import { CardMeta, CardHeader, CardContent, Card, Button, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function PlantCard({name, scName, type, img, plantToProject, plant}){

    function handleClick(){
        plantToProject(plant)
    }  // sends data to Search

    return( // renders each plant card
        <Card>
            <Image alt="uh oh" src={img} />
            <CardContent>
                <CardHeader>{name}</CardHeader>
                <CardMeta>
                    <span className='date'>{scName}</span>
                </CardMeta>
                <CardMeta>
                    {type}
                </CardMeta>
                <Button color='green' onClick={(e)=>handleClick(e)}>Add to Project</Button>
            </CardContent>
        </Card>
    )
}

export default PlantCard