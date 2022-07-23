import { Post } from "./Post.js";

export const Feed = ({ posts, query, setActivePost, setShowingReplies, setShowingImage }) => {
    return (
        <div>
            {posts
                .filter( post => post.title.toLowerCase().includes(query.toLowerCase()))
                .map( post => {
                    return <Post 
                                post={post} 
                                key={post.url} 
                                setActivePost={setActivePost} 
                                setShowingReplies={setShowingReplies}
                                setShowingImage={setShowingImage}
                            />
                })
            }
        </div>
    );
}