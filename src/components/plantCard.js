import { CardMeta, CardHeader, CardContent, Card, Button, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function PlantCard({id, name, scName, type, img}){

{/* <PlantCard id={plant.id} name={plant.common_name} scName={plant.scientific_name} type={plant.type} img={plant.image}/> */}

    return(
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
                <Button color='green'>Add to Project</Button>
            </CardContent>
        </Card>
    )
}

export default PlantCard