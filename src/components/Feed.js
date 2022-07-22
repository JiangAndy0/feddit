import { Post } from "./Post.js";

export const Feed = ({ posts }) => {
    return (
        <div>
            {posts.map( post => {
                return <Post post={post} key={post.url}/>
            })}
        </div>
    );
}