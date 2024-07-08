import { useNavigate} from "react-router-dom"
import { useState } from "react"
import { FormField, Button, Form } from 'semantic-ui-react'

function Login({user, setUser, password, setPassword, userData, landscapeData, setUserData, currentUser}){

    const [verifyPassword, setVerifyPassword] = useState("")

    const navigate = useNavigate()

    function loginUser(){
        console.log(userData)
        const foundUser = userData.find((users) => users.username === user);
        if (foundUser) {
            if (foundUser.password === password) {
                currentUser.current = user
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
                currentUser.current = user
            } else {
                alert("Password incorrect");
            }
          } else {
                alert("Sorry, Couldn't find an account with entered username");
          }
    }

    function createUser(){
        console.log(userData)
        const foundUser = userData.find((users) => users.username === user);
        if (!foundUser) {
            if (verifyPassword === password) {
                const newData = { 
                    username: user, 
                    password: password
                 };
                fetch('http://localhost:4000/users', {
                    method: 'POST', 
                    headers: {
                      'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(newData),
                  })
                  .then(response => response.json())
                  .then(data => {
                    console.log('Success:', data);
                    const newArr = [...userData, newData]
                    console.log(newArr)
                    setUserData(newArr);
                    navigate("/user");
                  })
                  .catch(error => {
                    console.error('Error:', error);
                  });
            } else {
                alert("Passwords do not match");
            }
          } else {
                alert("Sorry, this Username is already in use.");
          }
    }
    
    function createLandscaper(){
        console.log(userData)
        const foundLandscaper = landscapeData.find((landscaper) => landscaper.username === user);
        if (!foundLandscaper) {
            if (verifyPassword === password) {
                const newData = { 
                    username: user, 
                    password: password
                 };
                fetch('http://localhost:4000/landscapers', {
                    method: 'POST', 
                    headers: {
                      'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify(newData),
                  })
                  .then(response => response.json())
                  .then(data => {
                    console.log('Success:', data);
                    const newArr = [...userData, newData]
                    console.log(newArr)
                    setUserData(newArr);
                    navigate("/user");
                  })
                  .catch(error => {
                    console.error('Error:', error);
                  });
            } else {
                alert("Passwords do not match");
            }
          } else {
                alert("Sorry, this Username is already in use.");
          }
    }

    return(
        <div className="body">
        <div className="Container"> 
            <Form className="Login">
                <h1>Login</h1>
                <FormField>
                    <label>Username</label>
                    <input placeholder='Username' onChange={(e)=>setUser(e.target.value)}/>
                </FormField>
                <FormField>
                    <label>Password</label>
                    <input placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                </FormField>
                <div className="Button">
                    <Button color='green' onClick={loginUser}>Login Home Owner</Button>
                    <Button color='green' onClick={loginLandscaper}>Login Landscaper</Button>
                </div>
            </Form>
            <Form className="CreateAccount">
                <h1>Create Account</h1>
                <FormField>
                    <label>Username</label>
                    <input placeholder='Username' onChange={(e)=>setUser(e.target.value)}/>
                </FormField>
                <FormField>
                    <label>Password</label>
                    <input placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                </FormField>
                <FormField>
                    <label>Verify Password</label>
                    <input placeholder='Password' onChange={(e)=>setVerifyPassword(e.target.value)}/>
                </FormField>
                <div className="Button">
                    <Button color='green' onClick={createUser}>Create a Home Owner Acount</Button>
                    <Button color='green' onClick={createLandscaper}>Create a Landscaper Acount</Button>
                </div>
            </Form>
        </div>
        </div>
    )
}

export default Login