import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_COMMENT } from "../../utils/mutations";

import Auth from "../../utils/auth";
const CommentForm = ({ postId }) => {
    const [commentText, setCommentText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log("getprofile function", Auth.getProfile());

            const { data } = await addComment({
                variables: {
                    postId,
                    commentText,
                    commentAuthor: Auth.getProfile().username
                },
            });

            setCommentText('');
        } catch (err) {
        
            console.error('error adding comment', err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'commentText' && value.length <= 280) {
            setCommentText(value);
            setCharacterCount(value.length);
        }
    };

    return (
        <div className="commentForm-container">
            {
                Auth.loggedIn() ? (
                    <div className="comment-form">
                        <p className={`${
                            characterCount === 280 || error ? 'text-danger' : ''
                        }`}
                        >
                            Character Count: {characterCount}/280
                            {error && <span className="comment-error">{error.message}</span>}
                        </p>
                        
                        <form className="add-comment" onSubmit={handleFormSubmit}>
                            
                                <textarea
                                    name="commentText"
                                    placeholder="Add your comment..."
                                    value={commentText}
                                    className="comment-input"
                                    onChange={handleChange}
                                ></textarea>
                            

                            
                                <button className="commentBtn" type="submit">
                                    +
                                </button>
                            
                        </form>
                    </div>
                ) : (
                    <p>
                        Please login to join the conversation! {' '}
                        <Link to="/login">login</Link> or <Link to="/signup">signup</Link>
                    </p>
                )
            }
        </div>
    )
}

export default CommentForm;