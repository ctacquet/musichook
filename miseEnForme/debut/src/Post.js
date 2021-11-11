import './post.css';
import {Search} from "@material-ui/icons";

export default function Post(){
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="content">
                    <img className="postProfilePicture" src="/assets/user.png"/>

                    <div className="searchPostInput">
                        <Search className="searchIcon"/>
                        <input placeholder="Post a song" className="postInput"/>
                    </div>
                </div>

            </div>
        </div>

    )
}