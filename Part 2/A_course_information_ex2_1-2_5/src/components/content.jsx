import Part from "./part"

const Content = ({content}) => {

return(
        <ul>
            {content.map(part => <Part key = {part.id} name = {part.name} exercises = {part.exercises} />)}          
        </ul>
            
        
    )
}

export default Content