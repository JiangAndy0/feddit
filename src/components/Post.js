export const Post = ({ post }) => {
    return (
        <div>
            <h2>Title: {post.title}</h2>
            <p>Author: {post.author}</p>
            <p>Comments: {post.numComments}</p>
            <p>Score: {post.score}</p>
            <p>Posted: {post.timeAgo} ago</p>
            <img src={post.imgPreviewURL} />
            <a href={post.url}>See on Reddit</a>
        </div>
    );
}