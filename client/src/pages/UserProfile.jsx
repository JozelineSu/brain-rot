import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import PostList from "../components/PostList";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from '../utils/auth';

const UserProfile = () => {
    const { username: userParam } = useParams();

    const { loading, data, error} = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });
    
    const user = data?.me || data?.user || {};

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/me" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
            <h4>You need to be logged in.</h4>
        );
    }

    return (
        <div>
            <div>
                <div>
                    <h2>
                        Viewing {userParam ? `${user.username}'s` : 'your'} profile.
                    </h2>
                    <PostList
                        posts={user.posts}
                    />
                </div>
            </div>
        </div>
    )
}
export default UserProfile;