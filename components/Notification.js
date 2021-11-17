import {io} from "socket.io-client"
import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../firebase";

function Notification({socket}) {


    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    console.log(socket)

   useEffect(() => {
        socket.on("getNotification", (data) => {
            setNotifications((prev) => [...prev, data]);
        });
    }, [socket]);

    console.log(notifications)

    const displayNotification = ({ senderId, type }) => {
        let action;

        if (type === 1) {
            action = "liked";
        } else if (type === 2) {
            action = "commented";
        } else {
            action = "shared";
        }
        return (
            <span className="notification">{`${senderId} ${action} your post.`}</span>
        );
    };

    const handleRead = () => {
        setNotifications([]);
        setOpen(false);
    };

    return (
        <div className="navbar">
            <span className="logo">Lama App</span>
            <div className="icons">
                <div className="icon" onClick={() => setOpen(!open)}>
                    <img src={Notification} className="iconImg" alt="" />
                    {
                        notifications.length >0 &&
                        <div className="counter">{notifications.length}</div>
                    }
                </div>
                <div className="icon" onClick={() => setOpen(!open)}>

                </div>
                <div className="icon" onClick={() => setOpen(!open)}>

                </div>
            </div>
            {open && (
                <div className="notifications">
                    {notifications.map((n) => displayNotification(n))}
                    <button className="nButton" onClick={handleRead}>
                        Mark as read
                    </button>
                </div>
            )}
        </div>
    );
}
export default Notification