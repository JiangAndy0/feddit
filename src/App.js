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
      setQuery(''); //reset query 
      setPosts([]) //reset posts
      smoothScrollUp() //scroll to top of the page
      
      const buttonHighlighter = document.getElementById('button-highlighter');

      //change feed background color and feed button highlighter positon
      if (feed === 'dinner'){
        document.body.style.backgroundColor = 'hsl(20, 75%, 70%)';
        buttonHighlighter.style.left = '0';
      } else if (feed === 'dessert'){ 
        document.body.style.backgroundColor = 'hsl(170, 75%, 70%)';
        buttonHighlighter.style.left = '50%';
      }

      const posts = await getPostsForFeed(feed);
      setPosts(posts);

    }
    fetchData();
  }, [feed]);

  //scroll to the top of the page when search query changes
  useEffect( () => {
    window.scrollTo(0, 0);
  }, [query])

  //handle when the search query changes
  const handleChange = ( e ) => {
    setQuery(e.target.value);
  }

  //smooth scroll to the top of the page
  const smoothScrollUp = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  return (
    <div className="App">
      <nav>
        <div id="nav-elements">
          <h1><FontAwesomeIcon icon={faFaceGrinTongue} className={'icon ' + feed}/>FEDDIT</h1>
          <div id="feed-buttons-container">
            <div id="feed-buttons">
              <div id="button-highlighter"></div>
              <button onClick={ 
                () => {
                  setFeed('dinner');
                  smoothScrollUp();
                }
              }>
                <FontAwesomeIcon icon={faBurger} id='dinner-icon' className={feed} />
              </button>
              <button onClick={ 
                () => {
                  setFeed('dessert');
                  smoothScrollUp();
                }
              }>
                <FontAwesomeIcon icon={faIceCream} id='dessert-icon' className={feed} />
              </button>
            </div>
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
