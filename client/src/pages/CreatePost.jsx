import '../styles/CreatePost.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { ADD_POST } from '../utils/mutations';
import { QUERY_POSTS, QUERY_ME, QUERY_USER } from '../utils/queries';

import Auth from '../utils/auth';

function CreatePost() {
    const [postText, setPostText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const navigate = useNavigate();
    const username = Auth.getProfile().data.username;

    const [addPost, { error }] = useMutation
    (ADD_POST, {
        refetchQueries: [
            QUERY_POSTS,
            'getPosts',
            QUERY_ME,
            'me'
        ]
    });


    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data} = await addPost({
                variables: {
                    postText,
                    postAuthor: Auth.getProfile().username
                },
            });
            console.log('success adding new post:', data);
           
            setPostText('');
            navigate('/');
        } catch (err) {
            console.error('Error making new post:', err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'postText' && value.length <= 280) {
            setPostText(value);
            setCharacterCount(value.length);
        }
    };

    return (
        <div className="create-post">
            {Auth.loggedIn() ? (
                <>
                    <div className="header">
                        <div>
                            <h1>User Pic</h1>
                            <h1>{username}</h1>
                        </div>
                    </div>

                    <p className={`${
                            characterCount === 280 || error ? 'text-danger' : ''
                        }`}
                    >
                        CharacterCount: {characterCount}/280
                    </p>
                    <form className='post-form' onSubmit={handleFormSubmit}>
                        <div>
                            <textarea
                                name="postText"
                                value={postText}
                                className="form-input"
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div>
                            <button className="btn" type="submit">
                                +
                            </button>
                        </div>
                        {error && (
                            <div>
                                {error.message}
                            </div>
                        )}
                    </form>
                </>
            ) : (
                <p>
                    You need to be logged in to make your post. Please {' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}  
        </div>
    )
}

export default CreatePost;