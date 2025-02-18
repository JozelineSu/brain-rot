import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from '../../utils/queries';
import { useEffect } from "react";

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
    <div className="discover">
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
            ))
        }
        </div>
        
    </div>
);
}

export default PostList;