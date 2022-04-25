import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { confirmLogout } from "../slices/loginSlice";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

export const Logout = () => {

    const token = useSelector((state) => state.login.token);
    const dispatch = useDispatch();
    if (token && token.length > 0)
    {
        console.log("Logout button rendered");
        return (
            <div className="logout-button">
                <br/>
                <Button variant="danger"
                onClick={() => dispatch(confirmLogout())}>
                Logout
                </Button>
            </div>
        );
    }
    return null;

}