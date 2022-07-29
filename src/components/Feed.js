import { Post } from "./Post.js";

export const Feed = ({ posts, isLoading, query, setActivePost, setShowingReplies, setShowingImage }) => {
    return (
        <main className={isLoading ? 'loading' : ''}>
            {isLoading && <div className="lds-ring"><div></div><div></div><div></div><div></div></div>}
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
        </main>
    );
}