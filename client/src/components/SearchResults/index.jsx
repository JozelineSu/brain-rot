import { Link } from "react-router-dom";

const SearchResults = ({posts}) => {


    return (
        <>
            {posts && (
                posts.map((post) => (
                    <>         
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
                             <div className="post-tags">
                                {
                                    post.tags.map((tag) => (
                                        <div key={tag._id}>
                                            <p>{tag.tagText}</p>
                                        </div>
                                    ))
                                }
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
                    </>    
                    ))
                )                
            }
        </>
    )
}

export default SearchResults;