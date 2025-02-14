import "../styles/Discover.css";
import { useQuery } from "@apollo/client";

import PostList from "../components/PostList";

import NavBar from "../components/NavBar";
import AddBtn from "../components/AddBtn";
import Searchbar from "../components/Searchbar";

import { QUERY_POSTS } from '../utils/queries';
import { useEffect } from "react";

const Discover = () => {
        const { loading, data, refetch} = useQuery(QUERY_POSTS);
        const posts = data?.posts || [];

        useEffect(() => {
            refetch();
        }, []);
        
        return (
            <main>
                <NavBar/>
                <Searchbar/>
                <div>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <PostList
                            posts={posts}
                        />
                    )}
                </div>
                <AddBtn/>
                
            </main>
    );
};

export default Discover;