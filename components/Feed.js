import MainSectionHeader from "./MainSectionHeader";
import Posts from "./Posts";

function Feed() {
    return (
        <section className="col-span-2">
            {/*
            <MainSectionHeader>
                <p className="inline text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-red-600">
                    Feed
                </p>
            </MainSectionHeader>
             */}
            <Posts />
        </section>
    )
}

export default Feed