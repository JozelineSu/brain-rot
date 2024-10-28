import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import AddBtn from "../components/AddBtn";
import "../styles/Discover.css";


function Discover() {


    return (
        
        <div className="discover">
           <NavBar/>
           <div className="searchbar">
            Search
           </div>

           <div className="posts">{/*list of all posts*/}
                <div className="user-post">{/*how one post will look */}
                    <div className="character-pic">
                        Character Pic
                    </div>     

                    <div className="post-content">
                        <div className="post-text">
                            This is my post tralking about my charactrer
                        </div>
                        <div className="post-buttons">
                            <button>Like</button>
                            <Link to='/comments'>Comment</Link>
                            <button>Repost</button>
                        </div>
                        <div className="tags">
                            #tag, #tag, #tag, # tag
                        </div>                        
                    </div>
                </div>
                <AddBtn/>
           </div> 
            
        </div>
    )
}

export default Discover;