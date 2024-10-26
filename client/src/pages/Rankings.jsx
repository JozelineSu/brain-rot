import NavBar from "../components/NavBar";
import "../styles/Rankings.css";

function Rankings() {
    return (
        <div>
            <NavBar />
            <div className="top-rankings">
                <h1 className="top">TOP</h1>
                
                <div className="ranking-period">
                    <h1>MONTH</h1> 
                    <h1>WEEK</h1>                 
                    <h1>DAY</h1>                      
                </div>
               

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
                        <div className="tags">
                                View Tag
                        </div> 
                    </div>
                </div>
                <div className="top-post">
                    <div className="character-pic">
                        Character Pic
                    </div>     

                    <div className="post-content">
                        <div className="post-text">
                            this will be post with most likes about the character
                            View full post
                        </div>
                        <div className="tags">
                                View Tag
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rankings;