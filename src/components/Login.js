import { useNavigate} from "react-router-dom"
import { useState } from "react"
import { FormField, Button, Form } from 'semantic-ui-react'

function Login({user, setUser, password, setPassword, userData}){

    const navigate = useNavigate()

    function login(){
        // if(user === userData.username ? ){
        // }
        navigate("/user");

    }

    return(
        <>
        <h1>Login</h1>
        <Form>
            <FormField>
                <label>Username</label>
                <input placeholder='Username' onChange={(e)=>setUser(e.target.value)}/>
            </FormField>
            <FormField>
                <label>Password</label>
                <input placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
            </FormField>
            <Button onClick={login}>Login Home Owner</Button>
            <Button onClick={()=>navigate("/landscaper")}>Login Landscaper</Button>
        </Form>
        <h1>Create Account</h1>
        <Form>
            <FormField>
                <label>Username</label>
                <input placeholder='Username' />
            </FormField>
            <FormField>
                <label>Password</label>
                <input placeholder='Password' />
            </FormField>
            <FormField>
                <label>Verify Password</label>
                <input placeholder='Password' />
            </FormField>
            <Button onClick={()=>navigate("/user")}>Create a Home Owner Acount</Button>
            <Button onClick={()=>navigate("/landscaper")}>Create a Landscaper Acount</Button>
        </Form>
        </>
    )
}

export default Login