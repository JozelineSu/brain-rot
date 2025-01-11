import { Navigate, useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import AddBtn from "../components/AddBtn";

import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { REMOVE_POST } from "../utils/mutations";

import Auth from '../utils/auth';

const UserProfile = () => {
    const { username: userParam } = useParams();

    const { loading, data, error} = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });
    
    const user = data?.me || data?.user || {};

    const [removePost] = useMutation(REMOVE_POST, {
        update(cache, { data: { removePost } }) {
            // Read the existing user data from the cache
            const { me } = cache.readQuery({ query: QUERY_ME });
            
            // Write the new data with the post removed
            cache.writeQuery({
                query: QUERY_ME,
                data: {
                    me: {
                        ...me,
                        posts: me.posts.filter(post => post._id !== removePost._id),
                    },
                },
            });
        },
    });
    

    const handleRemovePost = async (postId) => {
        try {
            console.log('delete button clicked');
            const { data } = await removePost({
                variables: {
                    postId: postId,
                },
            });
            console.log('success deleting post', data);
        } catch (err) {
            console.error('error removing post', err);
        }
    };

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
                    <Link to={`/myCharacters`}>
                        Characters
                    </Link>
                    {
                        user.posts.map((post) => (
                            <div key={post._id}>
                                <div className="post-date">
                                    <p>{post.createdAt}</p>
                                </div>
                                <div className="post-text">
                                    <p>{post.postText}</p>
                                </div>
                                <div className="user-post-btns">
                                    <button>
                                        <Link to={`/userpost/${post._id}`}>Edit</Link>
                                    </button>
                                    <button onClick={() => handleRemovePost(post._id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    }
                    <AddBtn />
                </div>
            </div>
        </div>
    )
}
export default UserProfile;