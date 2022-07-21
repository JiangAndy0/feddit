import fetch from 'node-fetch';

//takes a feed json response from Reddit & returns an array of post objects with only the necessary info
const createPostsArray = feedJson => {

    //takes a url and returns a new url without 'amp;' in it
    const removeAmp = url => {
        return url.replaceAll('amp;', '');
    }

    const posts = feedJson.data.children
        .filter( post => { //only process posts that have images
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
                url: `https://reddit.com${post.data.permalink}`
            }
        });

    return posts;
}


//takes a post json response from Reddit & returns an array of reply objects with only necessary info
const createRepliesArray = async(postJson) => {

    //takes an array of replies that was fetched and returns an array of simplified replies
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
            return removeSearchParameters(userJSON.data.icon_img); //remove search parameters to access image
        } catch (e) {
            console.log(e);
        }

    }

    //takes an array of replies and adds author profile pictures to each reply
    const addProfilePics = async( repliesArray ) => {

        for (const reply of repliesArray) {
            if(reply.replies){
                await addProfilePics(reply.replies);
            }
            const authorImg = await getProfilePicLink(reply.author);
            reply.authorImg = authorImg;
        }

    }

    //gets the initial replies array, adds profile pic urls to each of the replies, then returns the array
    const repliesArray =  getSimpleReplies(postJson[1].data.children); 
    await addProfilePics(repliesArray);
    return repliesArray;
    
}

//fetches json information from a reddit url
const getJsonFor = async ( url ) => {
    //remove the forward slash at the end, then add .json
    const jsonURL = `${url.slice(0, url.length - 1)}.json`;

    try {
        const response = await fetch(jsonURL);
        const json = await response.json();
        return json;
    } catch (e) {
        console.log(e);
    }

}


const dinnerJSON = await getJsonFor('https://reddit.com/r/tonightsdinner/');
const dinnerFeed = createPostsArray(dinnerJSON);
//console.log(dinnerFeed);
const dessertJSON = await getJsonFor('https://reddit.com/r/DessertPorn/');
const dessertFeed = createPostsArray(dessertJSON);
//console.log(dessertFeed[3].jsonURL);
const dessertPostJSON = await getJsonFor(dessertFeed[0].url);
const dessertPostReplies = await createRepliesArray(dessertPostJSON);
console.log( dessertPostReplies);

