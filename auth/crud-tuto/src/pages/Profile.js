import React, { useState } from "react"
/*import { Card, Button, Alert } from "react-bootstrap"*/
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Profile() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <>
            <div>
                <strong>Email:</strong> {currentUser.email}
                <Link to="/update-profile" >
                    Update Profile
                </Link>

            </div>
            <div>
                <button  onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        </>
    )
}
