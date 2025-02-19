import '../styles/CreatePost.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { ADD_POST, ADD_TAG } from '../utils/mutations';
import { QUERY_POSTS, QUERY_ME, QUERY_USER, QUERY_TAGS } from '../utils/queries';

import Auth from '../utils/auth';

function CreatePost() {
    const [postText, setPostText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const navigate = useNavigate();
    const username = Auth.getProfile().data.username;

    const {data} = useQuery(QUERY_TAGS);
    const existingTags = data?.tags.map(tag => tag.tagText) || [];
    console.log(existingTags);
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState([]);

    const [addTag] = useMutation(ADD_TAG, {
        refetchQueries: [{query: QUERY_TAGS}]
    });

    const handleAddTag = async (event) => {
        event.preventDefault();
        if (!tagInput.trim()) return;

        if (!existingTags.includes(tagInput) && !tags.includes(tagInput)) {
            try {
                const {data} = await addTag({
                    variables: {tagText: tagInput}
                });
                setTags([...tags, tagInput]);
                setTagInput("");
                console.log("success adding new tag:", data);
            } catch (error) {
                console.error("error adding tag:", error);
            } 
        } 

        if (!tags.includes(tagInput)) {
            setTags([...tags, tagInput]);
        }
        
    }   

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
                    postAuthor: Auth.getProfile().username,
                    tags
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
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                placeholder='Add tags'
                            ></input>
                            <button onClick={handleAddTag}>+</button>
                            
                            

                            <div>
                                {tags.map((tag, index) => (
                                    <span key={index} className='tag'>
                                        {tag} <button onClick={() => setTags(tags.filter(t => t !==tag))}>x</button>
                                    </span>
                                ))}
                            </div>
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