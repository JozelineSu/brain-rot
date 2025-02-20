import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from 'react';

import { useParams, useNavigate } from "react-router-dom";

import { QUERY_SINGLE_POST, QUERY_TAGS } from "../utils/queries";
import { UPDATE_POST, ADD_TAG } from "../utils/mutations.js";

function EditPost() {
    const [updatePost] = useMutation(UPDATE_POST);
    const navigate = useNavigate();

    const [postText, setPostText] = useState("");

    const {tagData} = useQuery(QUERY_TAGS);
    const existingTags = tagData?.tags.map(tag => tag.tagText) || [];

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

    const { postId } = useParams();
    
    const { loading, data, refetch } = useQuery(QUERY_SINGLE_POST, {
        variables: { postId },
        onCompleted: (data) => {
            setPostText(data.post.postText);
            setTags(data.post.tags ? data.post.tags.map(tag => tag.tagText) : []);
        },
    });

    useEffect(() => {
            refetch();
        }, []);
    
    const post = data?.post || {};
    console.log('post data:', post);
    
    if (loading) {
        return <div>Loading...</div>
    }

    const handleInputChange = (event) => {
        const { value } = event.target;
        setPostText(value);
    };

    const handleUpdatePost = async (event) => {
        event.preventDefault();
        try {
            const { data } = await updatePost({
                variables: { postId, postText, tags},
            });
            console.log("post updated:", data);
            navigate(`/me`);
        } catch (err) {
            console.error("error updating post:", err);
        }
    };

    return (
        <div className="create-post">
                <form className='create-post' onSubmit={handleUpdatePost}>
                    <div>
                        <textarea
                            name="postText"
                            className="postText-input"
                            value={postText}
                            onChange={handleInputChange}
                        >{post.postText}</textarea>
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
                    
                    <div classsName='add-postContainer'>
                        <button className="add-postBtn" type="submit">
                            +
                        </button>
                    </div>
                </form>

        </div>
    )
    
}

export default EditPost;