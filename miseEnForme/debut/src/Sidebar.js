import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { Button } from "@material-ui/core";
import {CalendarToday, Group, Star} from "@material-ui/icons";



import { BrowserRouter as Router, Switch,  Link } from 'react-router-dom';




function Sidebar() {



    return (
        <Router>
            <div className="sidebar">

                <div className="sidebarWrapper">

                    <Link className="link" to={'/'}><SidebarOption Icon={HomeIcon} text="Home" styl="text-decoration: underline;" active={true} /></Link>
                    <SidebarOption Icon={Group} text="Discover" />
                    <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
                    <Link className="link" to={'/profile'}  ><SidebarOption Icon={PermIdentityIcon} text="Profile" /></Link>
                    <SidebarOption Icon={Star} text="Favorites"/>
                    <SidebarOption Icon={CalendarToday} text="Events"/>
                    <Button variant="outlined" className="postButton" fullWidth >
                        Post
                    </Button>
                </div>



            </div>
            <Switch>

            </Switch>
        </Router>

    );
}



export default Sidebar;