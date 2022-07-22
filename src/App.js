import {Feed} from './components/Feed.js'
import { useEffect, useState } from 'react';
import { getPostsForFeed } from './api.js';


function App() {
  const [feed, setFeed] = useState('dessert');
  const [posts, setPosts] = useState([]);
  
  //fetch new posts from Reddit when feed changes
  useEffect(() => { 
    async function fetchData() {
      const newPosts = await getPostsForFeed(feed);
      setPosts(newPosts);
    }
    fetchData();
  }, [feed]);

  return (
    <div className="App">
      <Feed posts={posts}/>
    </div>
  );
}

export default App;
