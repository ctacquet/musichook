import './Topbar.css';
import {Search} from "@material-ui/icons";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export default function Topbar(){
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <img src="/assets/logo.jpg" alt="" className="logo"/>
            </div>
            <div className="topbarCenter">
                <ArrowBackRoundedIcon className="back"/>
                <span className="routeName">Home</span>
            </div>
            <div className="topbarRight">

                <div className="searchTopbar">
                    <Search className="searchIcon"/>
                    <input placeholder="Search for events" className="searchTopbarInput"/>

                </div>

            </div>
        </div>
    )
}