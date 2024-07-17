import Form from "../components/Form"
import PublicNavBar from "../components/PublicNavBar"

function Register(){
    return <div>
        <PublicNavBar></PublicNavBar>
        <div>
            <Form route="/api/user/register/" method="register"/>
        </div>
    </div>
}

export default Register