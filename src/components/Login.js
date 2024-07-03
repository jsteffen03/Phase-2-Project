import {useNavigate} from "react-router-dom"

function Login(){
    const navigate = useNavigate()

    return(
        <>
        <div>Login Page</div>
        <button onClick={()=>navigate("/user")}>Login User</button>
        <button onClick={()=>navigate("/landscaper")}>Login Landscaper</button>
        </>
    )
}

export default Login