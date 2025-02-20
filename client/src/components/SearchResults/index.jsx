import "../../styles/PostList.css";
import { Link } from "react-router-dom";

import CommentIcon from "../../images/comment_icon.png";

const SearchResults = ({posts}) => {


    return (
        <>
            {posts && (
                posts.map((post) => (
                    <>         
                        <div key={post._id} className="post-content">
        
                            <div className="username">
                                <Link
                                    className="username-link"
                                    to={`/profiles/${post.postAuthor}`}
                                >
                                    {post.postAuthor}
                                </Link>
                            </div>
                            <div className="post-text">
                                <p>{post.postText}</p>  
                             </div>
                             <div className="post-tags">
                                {
                                    post.tags.map((tag) => (
                                        <div key={tag._id} className="tag">
                                            <p>#{tag.tagText},</p>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="post-interactions">
                                <Link
                                    className="commentBtn"
                                    to={`/posts/${post._id}`}
                                ><img src={CommentIcon} width="40"/>
                                </Link>
                            </div>
                        </div>
                    </>    
                    ))
                )                
            }
        </>
    )
}

export default SearchResults;