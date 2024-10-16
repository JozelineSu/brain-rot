import NavBar from "../components/NavBar";
import AddPostBtn from "../components/AddPostBtn";
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
                            #tag, #tag, #tag, # tag
                        </div>                        
                    </div>
                </div>
                <AddPostBtn/>
           </div> 
            
        </div>
    )
}

export default Discover;