import { useEffect, useState } from 'react';
import {Feed} from './components/Feed.js'
import { Replies } from './components/Replies.js';
import { getPostsForFeed } from './api.js';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger, faIceCream, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faFaceGrinTongue } from '@fortawesome/free-regular-svg-icons';
import { Picture } from './components/Picture.js';

function App() {
  const [feed, setFeed] = useState('dinner');
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');

  const [activePost, setActivePost] = useState({});
  const [showingReplies, setShowingReplies] = useState(false);
  const [showingImage, setShowingImage] = useState(false);
  
  //disable scrolling in the body when showing replies or picture
  useEffect( () => {
    if (showingReplies || showingImage) {
      document.body.style.overflow = 'hidden';
    } else { //reset
      document.body.style.overflow = 'scroll';
    }
  }, [showingReplies, showingImage]);

  //fetch new posts from Reddit and change background color when feed changes
  useEffect(() => { 
    async function fetchData() {
      const posts = await getPostsForFeed(feed);
      setPosts(posts);

      const buttonHighlighter = document.getElementById('button-highlighter');

      //change feed background color and feed button highlighter positon
      if (feed === 'dinner'){
        document.body.style.backgroundColor = 'hsl(20, 75%, 70%)';
        buttonHighlighter.style.left = '0';
      } else if (feed === 'dessert'){ 
        document.body.style.backgroundColor = 'hsl(170, 75%, 70%)';
        buttonHighlighter.style.left = '50%'
      }

    }
    fetchData();
  }, [feed]);


  //handle when the search query changes
  const handleChange = ( e ) => {
    setQuery(e.target.value);
  }


  return (
    <div className="App">
      <nav>
        <div id="nav-elements">
          <h1><FontAwesomeIcon icon={faFaceGrinTongue}/>FEDDIT</h1>
          <div id="feed-buttons">
            <div id="button-highlighter"></div>
            <button onClick={ () => {setFeed('dinner')}} >
              <FontAwesomeIcon icon={faBurger} />
            </button>
            <button onClick={ () => {setFeed('dessert')}} >
              <FontAwesomeIcon icon={faIceCream} />
            </button>
          </div>
          <div id='input-container'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/>
            <input 
              type='search' 
              placeholder={`Search for a ${feed}`}
              value={query}
              onChange={handleChange}
            />
          </div>
        </div>
      </nav>
      {showingReplies && 
        <Replies 
          activePost={activePost}
          setShowingReplies={setShowingReplies}
        />
      }
      {(showingReplies || showingImage) && 
        <div id='dark-overlay'></div>
      }
      {showingImage &&
        <Picture
          activePost={activePost}
          setShowingImage={setShowingImage}
        />
      }
      <Feed
        posts={posts} 
        query={query}
        setActivePost={setActivePost}
        setShowingReplies={setShowingReplies}
        setShowingImage={setShowingImage}
      />
    </div>
  );
}

export default App;
