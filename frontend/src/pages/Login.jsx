import Form from "../components/Form"
import PublicNavBar from "../components/PublicNavBar"

function Login(){
    return <div>
        <PublicNavBar></PublicNavBar>
        <div>
            <Form route="/api/token/" method="login"/>
        </div>
    </div>
}

export default Login