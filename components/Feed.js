import Menu from "./Menu";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Test from "../components/Test";

function Feed() {
    return (
        <main className="grid grid-cols-1 md:grid-cols-4 md:max-w-4xl xl:grid-cols-4 xl:max-w-8xl min-w-full px-8">
            {/* Left section */}
            <section className="col-span-1 pr-8">
                <div className="flex flex-col">
                    <div className="flex-none">
                        {/* Menu */}
                        <Menu />
                        {/* Post button */}
                    </div>
                    <div className="flex-grow">
                        
                    </div>
                    <div className="flex-none">
                        {/* Mini profile */}
                        <MiniProfile />
                    </div>
                </div>

            </section>

            {/* Middle section */}
            <section className="col-span-2">
                {/* Posts */}   
                <Posts />  
            </section>
                
            {/* Right section */}
            <section className="col-span-1">
            <Test/>
                {/* Events */} 
                {/* Favorites */} 
            </section>
        </main>
    )
}

export default Feed