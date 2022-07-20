import fetch from 'node-fetch';
import { mockPost } from './mocks/mockRedditPost.js';

//takes a url and returns a new url without 'amp;' in it
const removeAmp = url => {
    return url.replaceAll('amp;', '');
}

//takes a post's permalink and returns a link to access the json of that post
const getjsonURL = permalink => { 
    //remove the forward slash at the end before adding in other parts of the link
    return `https://reddit.com${permalink.slice(0, permalink.length - 1)}.json`;
}

//takes a feed json response from Reddit & returns an array of post objects with only the necessary info
const createPostsArray = feedJson => {
    const posts = feedJson.data.children
        .filter( post => { //only analyze posts that have images
            if (post.data.preview) return true;
            return false;
        }) 
        .map( post => {

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
                jsonURL: getjsonURL(post.data.permalink)
            }
        });

    return posts;
}

//takes an author's name and returns a link to their profile picture
const getProfilePicLink = async(name) => {

    const removeSearchParameters = url => {
        if (url.includes('?')) {
            const indexQuestion = url.indexOf('?');
            return url.slice(0, indexQuestion);
        } else {
            return url;
        }
    }

    const aboutURL = `https://www.reddit.com/user/${name}/about.json`;
    //get json for user's about page
    try {
        const response = await fetch(aboutURL);
        const userJSON = await response.json();
        console.log(userJSON);
        return removeSearchParameters(userJSON.data.icon_img); //remove search parameters to access image
    } catch (e) {
        console.log(e);
    }

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
                //recursively get replies for each reply if they exist
                replies: reply.data.replies ? getSimpleReplies(reply.data.replies.data.children) : ""
            }
        })
    } 

    return getSimpleReplies(postJson[1].data.children);
}



//fetches json information for /r/dinner or /r/dessertPorn or a specific URL
const getJsonFor = async ( input ) => {
    let jsonURL;
    if (input === 'dinner'){
        jsonURL = 'https://www.reddit.com/r/tonightsdinner.json';
    } else if (input === 'dessert') {
        jsonURL = 'https://www.reddit.com/r/DessertPorn.json';
    } else {
        jsonURL = input;
    }

    try {
        const response = await fetch(jsonURL);
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(e);
    }

}

const dinnerJSON = await getJsonFor('dinner');
const dinnerFeed = createPostsArray(dinnerJSON);
//console.log(dinnerFeed);
const dessertJSON = await getJsonFor('dessert');
const dessertFeed = createPostsArray(dessertJSON);
//console.log(dessertFeed[3].jsonURL);
const dessertPostJSON = await getJsonFor(dessertFeed[3].jsonURL);
//console.log(createRepliesArray(dessertPostJSON));

const profilePicLink = await getProfilePicLink('Dense_Calligrapher36');
console.log(profilePicLink);
