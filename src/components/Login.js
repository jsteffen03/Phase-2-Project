import { useNavigate} from "react-router-dom"
import { useState } from "react"
import { FormField, Button, Form } from 'semantic-ui-react'

function Login({user, setUser, password, setPassword, userData, landscapeData}){


    const navigate = useNavigate()

    function loginUser(){
        console.log(userData)
        const foundUser = userData.find((users) => users.username === user);
        if (foundUser) {
            if (foundUser.password === password) {
              navigate("/user");
            } else {
              alert("Password incorrect");
            }
          } else {
            alert("Sorry, Couldn't find an account with entered username");
          }
    }

    function loginLandscaper(){
        console.log(userData)
        const foundLandscaper = landscapeData.find((landscaper) => landscaper.username === user);
        if (foundLandscaper) {
            if (foundLandscaper.password === password) {
                navigate("/landscaper");
            } else {
              alert("Password incorrect");
            }
          } else {
            alert("Sorry, Couldn't find an account with entered username");
          }
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
            <Button onClick={loginUser}>Login Home Owner</Button>
            <Button onClick={loginLandscaper}>Login Landscaper</Button>
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