import "../../styles/PostList.css";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from '../../utils/queries';
import { useEffect } from "react";
import CommentIcon from "../../images/comment_icon.png";

import NavBar from "../NavBar";
import AddBtn from "../AddBtn";

const PostList = () => {
    const { loading, data, refetch} = useQuery(QUERY_POSTS);
            const posts = data?.posts || [];
    
            useEffect(() => {
                refetch();
            }, []);



    if (!posts.length) {
        return (
        <div>
            <NavBar/>
           <h3>No Posts Yet</h3>
           <AddBtn /> 
        </div>
        )
    }

    return (
    
        <div className='posts'> 
        {posts &&
            posts.map((post) => (
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
                        >
                            <img src={CommentIcon} width="40"/>
                            
                        </Link>
                     </div>
                </div>
            ))
        }
        </div>
        
    
);
}

export default PostList;