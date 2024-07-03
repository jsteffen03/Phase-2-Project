import { useNavigate } from "react-router-dom"

function Userpage(){
    const navigate = useNavigate()

    return(
        <>
        <div>User home page</div>
        <button onClick={()=>navigate("/user/search")}>Search Plants</button>
        </>
    )
}

export default Userpage;