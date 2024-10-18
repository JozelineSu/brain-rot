import NavBar from "../components/NavBar";
import "../styles/Rankings.css";

function Rankings() {
    return (
        <div>
            <NavBar />
            <div className="top-rankings">
                <h1>top</h1>
                <button className="this-month">month</button>
                <button className="this-week">week</button>
                <button className="this day">day</button>
            </div>

            <div className="rank-postings">
                <div className="top-post">
                    <div className="character-pic">
                        Character Pic
                    </div>     

                    <div className="post-content">
                        <div className="post-text">
                            this will be post with most likes about the character
                            View full post
                        </div>
                        <div className="post-buttons">
                            <button>Like</button>
                            <button>Comment</button>
                            <button>Repost</button>
                        </div>
                        <div className="tags">
                                Go to tag link
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rankings;