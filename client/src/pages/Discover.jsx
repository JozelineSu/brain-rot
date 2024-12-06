import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import AddBtn from "../components/AddBtn";
import "../styles/Discover.css";
import { useQuery } from "@apollo/client";

import { QUERY_POSTS } from '../utils/queries';

const Discover = () => {
        const { loading, data} = useQuery(QUERY_POSTS);
        const posts = data?.posts || [];
        
        if (!posts.length) {
            return (
            <div>
                <NavBar/>
                <div className="searchbar">
                    Search
                </div>
               <h3>No Posts Yer</h3> 
            </div>
            )
        }

        return (
        <div className="discover">
           <div className="searchbar">
                Search
           </div>
            <div>
            {posts &&
                posts.map((post) => (
                    <div key={post._id}>
                         <div className="username">
                            <Link
                            className="username"
                            to={`/profiles/${post.postAuthor}`}
                            >
                                {post.postAuthor}
                            </Link>
                         </div>
                         <div className="post-text">
                            <p>{post.postText}</p>
                         </div>
                         <div className="post-interactions">
                            <Link
                                className="commentBtn"
                                to={`/posts/${post._id}`}
                            >Comment 
                            </Link>
                            <p>heart</p>
                         </div>
                    </div>
                ))
            }
            <AddBtn/>
            </div>
            
        </div>
    )
}

export default Discover;