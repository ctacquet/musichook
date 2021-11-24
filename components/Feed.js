import Menu from "./Menu";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";

function Feed() {
    return (
        <section className="col-span-2">
            {/* Posts */}   
            <Posts />  
        </section>
    )
}

export default Feed