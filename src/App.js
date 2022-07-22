import {Feed} from './components/Feed.js'
import { useEffect, useState } from 'react';
import { getPostsForFeed } from './api.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger, faIceCream } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [feed, setFeed] = useState('dinner');
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  
  //fetch new posts from Reddit when feed changes
  useEffect(() => { 
    async function fetchData() {
      const newPosts = await getPostsForFeed(feed);
      setPosts(newPosts);
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
      <Feed posts={posts} query={query}/>
    </div>
  );
}

export default App;
