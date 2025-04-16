import { Stack, Typography } from "@mui/material"
import { text } from "stream/consumers"

const items = [
    {
        title: 'Developer',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus fuga est nulla voluptate veniam rem dolorum quo placeat, voluptatibus natus nisi asperiores voluptates alias iure mollitia deserunt! Iusto, sapiente omnis?'
    },
    {
        title: 'Developer',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus fuga est nulla voluptate veniam rem dolorum quo placeat, voluptatibus natus nisi asperiores voluptates alias iure mollitia deserunt! Iusto, sapiente omnis?'
    },
    {
        title: 'Developer',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus fuga est nulla voluptate veniam rem dolorum quo placeat, voluptatibus natus nisi asperiores voluptates alias iure mollitia deserunt! Iusto, sapiente omnis?'
    },
    {
        title: 'Developer',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus fuga est nulla voluptate veniam rem dolorum quo placeat, voluptatibus natus nisi asperiores voluptates alias iure mollitia deserunt! Iusto, sapiente omnis?'
    }
]

function Content(){
    return(
        <Stack flexDirection='column'
        sx={{
            maxWidth: '450px',
            alignSelf: 'center',
            margin: 'auto'
        }}>
            {items.map((item, index)=>(
                <div>
                    <Typography>{item.title}</Typography>
                    <Typography variant='body2' sx={{color:'grey'}}>{item.description}</Typography>
                </div>
            ))}
        </Stack>

    )
}

export default Content