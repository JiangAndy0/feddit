import { mockFeed } from "./mocks/mockRedditFeed.js";
import { mockPost } from "./mocks/mockRedditPost.js";

//takes a url and returns a new url without 'amp;' in it
const removeAmp = url => {
    return url.replaceAll('amp;', '');
}

//takes a post's permalink and returns a link to access the json of that post
const getJsonURL = permalink => { 
    //remove the forward slash at the end before adding in other parts of the link
    return `https://reddit.com${permalink.slice(0, permalink.length - 1)}.json`;
}

//takes a feed json response from Reddit & returns an array of post objects with only the necessary info
const createPostsArray = feedJson => {
    const posts = feedJson.data.children.map( post => {

        const imgPreviews = post.data.preview.images[0].resolutions; //get the previews of the post's first image
        const previewURL = removeAmp( imgPreviews[imgPreviews.length - 1].url ); //get the highest quality preview URL

        return {
            title: post.data.title,
            author: post.data.author,
            numComments: post.data.num_comments,
            score: post.data.score,
            createdUTC: post.data.created_utc,
            imgURL: post.data.url,
            imgPreviewURL: previewURL,
            url: `https://reddit.com${post.data.permalink}`,
            jsonURL: getJsonURL(post.data.permalink)
        }
    });

    return posts;
}

//takes a post json response from Reddit & returns an array of reply objects with only necessary info
const createRepliesArray = postJson => {

    //takes reddit's array of replies for this post and returns an array of simplified reply objects
    const getSimpleReplies = repliesArray => {
        return repliesArray.map( reply => {

            return {
                author: reply.data.author,
                body: reply.data.body,
                score: reply.data.score,
                createdUTC: reply.data.created_utc,
                //recursively get replies of each reply if they exist
                replies: reply.data.replies ? getSimpleReplies(reply.data.replies.data.children) : ""
            }
        })
    } 

    return getSimpleReplies(postJson[1].data.children);
}



const posts = createPostsArray(mockFeed);
//console.log(posts);
const replies = createRepliesArray(mockPost);
console.log(replies[1].replies[0].replies);