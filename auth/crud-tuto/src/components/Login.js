import React, { useRef, useState } from "react"
/*import { Form, Button, Card, Alert } from "react-bootstrap"*/
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import "./Login.css"

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            console.log("entré" + history);
            await login(emailRef.current.value, passwordRef.current.value)

            history.push("/")

        } catch {
            setError("Failed to log in")
        }

        setLoading(false)
    }

    return (

            <div className="container">


            <div className="spacer layer1">
                <div className="blank">
                    <div className="spanWrapper">
                        <span className="spanName">MusicHook</span>
                    </div>

                </div>
                <div className="login">

                    <h2 className="h2">Log In</h2>

                    <form onSubmit={handleSubmit}>

                        <input className="email" ref={emailRef} type="email" id="email" required={true} placeholder="email"/>



                        <input className="password" ref={passwordRef} type="password" id="password" required={true} placeholder="password">
                        </input>


                        <input className="submit" disabled={loading} value="Log In" type="submit">
                        </input>
                    </form>
                    <div className="forgotPassword">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <div className="signup">
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
            </div>


    )
}
