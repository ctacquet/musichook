import Posts from "./Posts";

function Feed() {
    return (
        <main className="grid grid-cols-1 md:grid-cols-4 md:max-w-4xl xl:grid-cols-4 xl:max-w-8xl mx-auto">
            {/* Left section */}
            <section className="col-span-1">
                {/* Menu */}
                {/* Post button */}

            </section>

            {/* Middle section */}
            <section className="col-span-2">
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