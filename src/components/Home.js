import { useNavigate } from "react-router-dom"

function Home(){

    const navigate = useNavigate()

    return(
        <>
        <div>Home Page</div>
        <h1>My Landscaper</h1>
        <p>
            My Landscaper is an application that helps bridge the gap between You and Landscapers.
            My Landscaper allows you to create projects, whether it is a current project or just planning for the future, and search through a wide varitey of plants that you would like to see in your landscape.
            You can then give Lanscapers a code for your project, there they will be able to view the plants you have selected and easily incorprate them into a design for your project.
            My Landscaper is always expanding our plant data base and coming up with new ideas to help you easily tell your landscaper what you would like on your project, so keep a lookout for new features!
        </p>
        <button onClick={()=>navigate("/Login")}>Click to Login or Create an Account</button>
        </>
    )
}

export default Home