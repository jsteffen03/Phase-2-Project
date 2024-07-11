import { CardMeta, CardHeader, CardContent, Card, Button, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

function PlantCard({name, scName, type, img}){

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