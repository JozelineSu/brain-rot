import "../styles/Discover.css";
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
        <main>
            <NavBar/>
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
                {posts.length ? (
                    <SearchResults posts={posts}/>
                ) : (
                    <PostList/>
                )
                }              
            </div>
            <AddBtn/>     
        </main>
    );
};

export default Discover;