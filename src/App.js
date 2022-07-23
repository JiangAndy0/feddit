import { useEffect, useState } from 'react';
import {Feed} from './components/Feed.js'
import { Replies } from './components/Replies.js';
import { getPostsForFeed } from './api.js';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger, faIceCream } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [feed, setFeed] = useState('dinner');
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');

  const [activePost, setActivePost] = useState({});
  const [showingReplies, setShowingReplies] = useState(false);
  
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
        <span>FEDDIT</span>
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
      <Feed 
        posts={posts} 
        query={query}
        setActivePost={setActivePost}
        setShowingReplies={setShowingReplies}
      />
    </div>
  );
}

export default App;
