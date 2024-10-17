import NavBar from "../components/NavBar";
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
                            <button>Comment</button>
                            <button>Repost</button>

                        </div>
                        <div className="tags">
                            <p>#tag, #tag, #tag, # tag</p>
                        </div>                        
                    </div>
                </div>
           </div> 
            
        </div>
    )
}

export default Discover;