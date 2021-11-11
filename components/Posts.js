import Post from "./Post"

const posts = [
    {
        id: '1',
        username: 'user1',
        userImg: 'https://store-images.s-microsoft.com/image/apps.33844.9007199266251864.cae5b893-a71b-40d7-abde-a6e8e23675c3.87610d96-f943-498a-89af-cc09d8a5eb7f?mode=scale&q=90&h=200&w=200&background=%23ffffff',
        img: 'https://images.frandroid.com/wp-content/uploads/2020/12/streaming_guide.jpg',
        caption: "This is DOPE !"
    },
    {
        id: '2',
        username: 'user2',
        userImg: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80',
        img: 'https://images.frandroid.com/wp-content/uploads/2020/12/streaming_guide.jpg',
        caption: "This is DOPE !"
    },
    {
        id: '3',
        username: 'user3',
        userImg: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80',
        img: 'https://images.frandroid.com/wp-content/uploads/2020/12/streaming_guide.jpg',
        caption: "This is DOPE !"
    },
]

function Posts() {
    return (
        <div>
            {posts.map((post) => (
                <Post 
                    key={post.id} 
                    id={post.id}
                    username={post.username}
                    userImg={post.userImg}
                    img={post.img}
                    caption={post.caption}
                />
            ))}
        </div>
    )
}

export default Posts
