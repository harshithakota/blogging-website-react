import React, {useState} from "react"
import "./login.css"
import axios from '../http-common'
import { useNavigate } from "react-router-dom"

const Login = ({updateUser}) => {

    const history = useNavigate()

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

  const [errorMessage, setErrorMessage] = useState('');

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
//api call
    const login = () => {
        axios.post("/login", user)
        .then(res => {
            // alert(res.data.message)
            console.log(res)
            updateUser(res.data.user)
            history("/")
        }).catch(err => {
          setErrorMessage(err.response.data.message);
          console.log(err.response.data.message);
  });
    }

    return (
        <div className="login">
        {errorMessage && (
  <p className="error"> {errorMessage} </p>
)}
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="buton" onClick={login}>Login</div>
            <div>or</div>
            <div className="buton" onClick={() => history("/signup")}>Register</div>
        </div>
    )
}

export default Login
