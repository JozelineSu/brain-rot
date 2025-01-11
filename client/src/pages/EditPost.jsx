import { useQuery, useMutation } from "@apollo/client";
import { useState } from 'react';

import { useParams, useNavigate } from "react-router-dom";

import { QUERY_SINGLE_POST } from "../utils/queries";
import { UPDATE_POST } from "../utils/mutations.js";

function EditPost() {
    const [characterCount, setCharacterCount] = useState(0);
    const [postText, setPostText] = useState("");
    const { postId } = useParams();
    const [updatePost] = useMutation(UPDATE_POST);
    const navigate = useNavigate();

    const { loading, data } = useQuery(QUERY_SINGLE_POST, {
        variables: { postId },
        onCompleted: (data) => {
            setPostText(data.post.postText);
            setCharacterCount(data.post.postText.length);
        },
    });
    
    const post = data?.post || {};
    if (loading) {
        return <div>Loading...</div>
    }

    const handleInputChange = (event) => {
        const { value } = event.target;
        setPostText(value);
        setCharacterCount(value.length);
    };

    const handleUpdatePost = async (event) => {
        event.preventDefault();
        try {
            const { data } = await updatePost({
                variables: { postId, postText},
            });
            console.log("post updated:", data);
            navigate(`/me`);
        } catch (err) {
            console.error("error updating post:", err);
        }
    };

    return (
        <>

        <div className="header">
            <div>
                <h1>User Pic</h1>
                <h1>{post.postAuthor}</h1>
            </div>
            </div>

                <p className={`${
                    characterCount === 280 
                    }`}
                >
                    CharacterCount: {characterCount}/280
                </p>
                <form className='post-form' onSubmit={handleUpdatePost}>
                    <div>
                        <textarea
                            name="postText"
                            className="form-input"
                            value={postText}
                            onChange={handleInputChange}
                        >{post.postText}</textarea>
                    </div>

                    <div>
                        <button className="btn" type="submit">
                            Update
                        </button>
                    </div>
                </form>

        </>
    )
    
}

export default EditPost;