import "../styles/Discover.css";
import { useQuery } from "@apollo/client";

import PostList from "../components/PostList";

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
                <div>
                    <div>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <PostList
                                posts={posts}
                            />
                        )}
                    </div>
                </div>
            </main>
    );
};

export default Discover;