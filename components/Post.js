import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid"

function Post({ id, username, userImg, img, caption }) {
    return (
        <div className="bg-white my-7 border rounded-sm">
            {/* Header */}
            <div className="flex items-center p-5">
                <img src={userImg} className="rounded-full h-12 w-12 object-cover border p-1 mr-3" alt="" />
                <p className="flex-1 font-bold font-Poppins">{username}</p>
                <DotsHorizontalIcon className="h-5" />
            </div>

            {/* Image */}
            <img src={img} className="object-cover w-full" alt="" />

            {/* Buttons */}
            <div className="flex justify-between px-4 pt-4">
                <div className="flex space-x-4">
                    <HeartIcon className="btn" />
                    <ChatIcon className="btn" />
                    <PaperAirplaneIcon className="btn" />
                </div>
                <BookmarkIcon className="btn" />
            </div>

            {/* Caption */}

            {/* Comments */}

            {/* Input box */}

        </div>
    )
}

export default Post
