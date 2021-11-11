import Post from "./Post"

const posts = [
    {
        id: '123',
        username: 'redfive',
        userImg: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80',
        img: 'https://images.frandroid.com/wp-content/uploads/2020/12/streaming_guide.jpg',
        caption: "This is DOPE !"
    },
    {
        id: '123',
        username: 'redfive',
        userImg: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80',
        img: 'https://images.frandroid.com/wp-content/uploads/2020/12/streaming_guide.jpg',
        caption: "This is DOPE !"
    },
    {
        id: '123',
        username: 'redfive',
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
