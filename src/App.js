import { useEffect, useState } from 'react';
import {Feed} from './components/Feed.js'
import { Replies } from './components/Replies.js';
import { getPostsForFeed } from './api.js';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger, faIceCream } from "@fortawesome/free-solid-svg-icons";
import { faFaceGrinTongue } from '@fortawesome/free-regular-svg-icons';
import { Picture } from './components/Picture.js';

function App() {
  const [feed, setFeed] = useState('dinner');
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');

  const [activePost, setActivePost] = useState({});
  const [showingReplies, setShowingReplies] = useState(false);
  const [showingImage, setShowingImage] = useState(false);
  
  //fetch new posts from Reddit when feed changes
  useEffect(() => { 
    async function fetchData() {
      const posts = await getPostsForFeed(feed);
      setPosts(posts);
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
        <h1><FontAwesomeIcon icon={faFaceGrinTongue}/>FEDDIT</h1>
        <button onClick={ () => {setFeed('dinner')}} >
          <FontAwesomeIcon icon={faBurger} />
        </button>
        <button onClick={ () => {setFeed('dessert')}} >
          <FontAwesomeIcon icon={faIceCream} />
        </button>
        <input 
          type='search' 
          placeholder={`Search for a ${feed}`}
          value={query}
          onChange={handleChange}
        />
      </nav>
      {showingReplies && 
        <Replies 
          activePost={activePost}
          setShowingReplies={setShowingReplies}
        />
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
