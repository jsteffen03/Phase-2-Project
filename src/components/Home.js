import { useNavigate } from "react-router-dom"

function Home(){

    const navigate = useNavigate()

    return(
        <>
        <div>Home Page</div>
        <div>My Landscaper</div>
        <button onClick={()=>navigate("/Login")}>Click to Login or Create an Account</button>
        </>
    )
}

export default Home