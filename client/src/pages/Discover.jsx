import "../styles/Discover.css";
import SearchIcon from '../images/search_icon.png';
import SearchResults from "../components/SearchResults";
import PostList from "../components/PostList";
import NavBar from "../components/NavBar";
import AddBtn from "../components/AddBtn";

import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { SEARCH_TAGS } from "../utils/queries";

const Discover = () => {
    const [searchInput, setSearchInput] = useState("");
    const [search, {loading, data, error}] = useLazyQuery(SEARCH_TAGS);
    
    const posts = data?.searchTags || [];

    const handleSearch = async (event) => {
        event.preventDefault();

        search({ variables: {tagText: searchInput}});
    }
        
    return (
        <main className="discover">
            
            <div className="nav-search-container">
                <NavBar/>
                <form onSubmit={handleSearch}>
                    <input
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        type="text"
                        placeholder="Search..."
                    ></input>
                    <button className="searchBtn" type='submit'>
                        <img src={SearchIcon} width="30"/>
                    </button>
                </form>    
            </div>
            

            <div className="posts-container">
                {posts.length ? (
                    <SearchResults posts={posts}/>
                ) : (
                    <PostList/>
                )
                }  
                
                <AddBtn/>               
            </div>
                
        </main>
    );
};

export default Discover;