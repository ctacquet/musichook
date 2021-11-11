import './Feed.css';
import Post from "./Post";
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import InfiniteList from "./FeedList";
export default function Feed(){
    return (

            <div className="feed">
                    <div className="feedWrapper">
                           <Post/>
                        <hr className="hr"/>

                    </div>


            </div>

    )
}