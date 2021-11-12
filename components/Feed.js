import Menu from "./Menu";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";

function Feed() {
    return (
        <main className="grid grid-cols-1 md:grid-cols-6 md:max-w-6xl xl:grid-cols-6 xl:max-w-12xl mx-auto">
            {/* Left section */}
            <section className="col-span-1">
                <div className="flex flex-col">
                    <div className="">
                        {/* Menu */}
                        <Menu />
                        {/* Post button */}
                    </div>
                    <div className="flex-grow">
                    </div>
                    <div className="">
                        {/* Mini profile */}
                        <MiniProfile />
                    </div>
                </div>

            </section>

            {/* Middle section */}
            <section className="col-span-4">
                {/* Posts */}   
                <Posts />  
            </section>
                
            {/* Right section */}
            <section className="col-span-1">
                {/* Events */} 
                {/* Favorites */} 
            </section>
        </main>
    )
}

export default Feed