import { useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { SEARCH_TAGS } from "../../utils/queries";

function Searchbar() {
    const [searchInput, setSearchInput] = useState("");

    const [search, {loading, data, error}] = useLazyQuery(SEARCH_TAGS);

    

    const handleSearch = async (event) => {
        event.preventDefault();
        console.log("searchinput:", searchInput);
        search({ variables: {tagText: searchInput}});
    }

    return (
        <>
            <form onSubmit={handleSearch}>
                <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="text"
                    placeholder="Search..."
                ></input>
                <button type='submit'>
                    Search
                </button>
            </form>

            <div>
                {data && (
                    data?.searchTags.map((post) => (
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
            </div>
            
        
        </>
    )

}

export default Searchbar;
