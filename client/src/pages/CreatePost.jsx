import '../styles/CreatePost.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { ADD_POST, ADD_TAG } from '../utils/mutations';
import { QUERY_POSTS, QUERY_ME, QUERY_USER, QUERY_TAGS } from '../utils/queries';

import Auth from '../utils/auth';

function CreatePost() {
    const [postText, setPostText] = useState('');
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

        if (name === 'postText' && value.length >= 1) {
            setPostText(value);
        }
    };

    return (
        <div>
            {Auth.loggedIn() ? (
                <div className="create-post" >
                        <div className="username-createPost">
                            <p>{username}</p>
                        </div>
                        <form className='post-form' onSubmit={handleFormSubmit}>
                            <div>
                                <textarea
                                    name="postText"
                                    placeholder='Add your thoughts...'
                                    value={postText}
                                    className="postText-input"
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className='tag-form'>
                                <div className='add-tag'>
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        placeholder='Add tags'
                                    ></input>
                                    <button className='add-tagBtn'onClick={handleAddTag}>+</button>
                                </div>

                                <div className="display-tags">
                                    {tags.map((tag, index) => (
                                        <span key={index} className='tag-createPost'>
                                            {tag} <button className='remove-tagBtn' onClick={() => setTags(tags.filter(t => t !==tag))}>x</button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className='add-postContainer'>
                                <button className="add-postBtn" type="submit">
                                    +
                                </button>
                            </div>
                            {error && (
                                <div>
                                    {error.message}
                                </div>
                            )}
                        </form>
                    
                </div>
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