import PublicNavBar from "../components/PublicNavBar"

function About(){
    return <div>
        <PublicNavBar></PublicNavBar>
        <div>
            <h1>About Us</h1>
            <p>This website is intended to help Penn students visualize and understand the algorithms taught in CIS 1210.</p>
            <p>To get started with this site, please register with any username and password. This will allow us to save the data structures that you'll run algorithms on.</p>
            <p>After registering, you can start making arrays and graphs. When you click on a specific array/graph, you'll have the option to run any algorithm on it.</p>
        </div>
    </div>
}

export default About