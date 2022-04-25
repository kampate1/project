
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginToAccount } from "../slices/loginSlice";
import { registerAccount } from "../slices/registerSlice";
import { addUser } from "../slices/userSlice";
import { useState } from "react";
import { Form } from "react-bootstrap";


export const RegisterForm = () => {

    const token = useSelector((state) => state.login.token);
    const users = useSelector((state) => state.users);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    if (!token || token.length === 0)
    {
        console.log("Register form rendered");

        // Checks if any duplicate emails exists to prevent the
        // same email from being registered twice.
        const duplicateEmailExists = () => {
            for (let i = 0; i < users.data.length; i++)
            {
                if (email === users.data[i].email) {
                    return true;
                }
            }
            return false;
        }
        const handleRegistration = () => {
            if (!duplicateEmailExists())
            {
                dispatch(registerAccount({email, password}))
                // Default profile picture users get when they register
                const Image = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b0b4c759-ad9c-4425-a9f4-ab89e2fd9837/de8cefl-35c0bc59-59b9-42ab-b19f-5c73828bb78e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2IwYjRjNzU5LWFkOWMtNDQyNS1hOWY0LWFiODllMmZkOTgzN1wvZGU4Y2VmbC0zNWMwYmM1OS01OWI5LTQyYWItYjE5Zi01YzczODI4YmI3OGUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.81ixeN9b4cfDmfBlskK9CUyAMDtRhYNU7lfwTI8WI5Q";
                const id = users.total + 1;
                let index = 0;
                const firstName = () => {
                    let name = "";
                    // get everything before first '.' (first name)
                    for (let i = 0; i < email.length; i++)
                    {
                        if (email[i] !== '.') {
                            name += email[i];
                        } else {
                            index = i;
                            return name;
                        }
                        return name;
                    }
                }
                const lastName = () => {
                    let name = "";
                    // get everything after first '.' and stop until '@' is reached
                    for (let i = index; i < email.length; i++)
                    {
                        if (email[i] !== '@') {
                            name += email[i];
                        } else {
                            return name;
                        }
                    }
                    return name;
                }
                const data = {id: id, email: email, first_name: firstName, last_name: lastName, avatar: Image};
                dispatch(addUser({data: data}));
                setEmail("");
                setPassword("");
            } else {
                alert("Email already exists.");
            }
        }
        const form = (
            <div className="register-form">
                <br/>
                <br/>
                <br/>
                <br/>
                <h1><b>Register</b></h1>
                <Form>
                    <Form.Group>
                        <Form.Control 
                         type="email" 
                         size="sm" 
                         placeholder="Enter email"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}/>
                        <br/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                         type="password"
                         size="sm"
                         placeholder="Enter password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <br/>
                </Form>
                <Button 
                 disabled={email.length === 0 || password.length === 0}
                 variant="success" 
                 onClick={() => handleRegistration()}>Register</Button>
            </div>
        );
        return form;

    }
    return null;

}


export const LoginForm = () => {
    
    const token = useSelector((state) => state.login.token);
    const users = useSelector((state) => state.users);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    if (!token || token.length === 0)
    {
        
        const handleLogin = () => {
            dispatch(loginToAccount({email, password}));
            setEmail("");
            setPassword("");
        };
        console.log("Login form rendered");
        const form = (
            <div className="login-form">
              <br/>
                <h1><b>Login</b></h1>
                <Form>
                    <Form.Group>
                        <Form.Control 
                         type="email" 
                         size="sm" 
                         placeholder="Enter email"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}/>
                        <br/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                         type="password"
                         size="sm"
                         placeholder="Enter password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <br/>
                    <Button 
                    disabled={email.length === 0 || password.length === 0}
                    variant="success" 
                    onClick={() => handleLogin()}>Login</Button>
                 </Form>
            </div>
        );
        return form;
    }
    return null;
}