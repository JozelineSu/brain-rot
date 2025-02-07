import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_TAGS } from '../../utils/queries';
import { ADD_TAG } from '../../utils/mutations';

function TagList({ tags, setTags}) {
    const {data} = useQuery(QUERY_TAGS);
    const existingTags = data?.tags.map(tag => tag.tagText) || [];

    const [tagInput, setTagInput] = useState("");
    
    const [addTag] = useMutation(ADD_TAG, {
        refetchQueries: [{query: QUERY_TAGS}]
    });

    const filteredTags = existingTags.filter(tag =>
        tag.toLowerCase().includes(tagInput.toLowerCase())
    );

    const handleAddTag = async (tag) => {
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
        setTagInput("");
    };

    const handleNewTag = async (event) => {
        event.preventDefault();
        if (!tagInput.trim()) return;

        try {
            await addTag({
                variables: { name: tagInput.trim() }
            });

            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        } catch (error) {
            console.error("Error adding tag:", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder='Add tags'
            ></input>
            <button onClick={handleNewTag}>+</button>
            
            {filteredTags.length > 0 && (
                <ul>
                    {filteredTags.map((tag, index) => (
                        <li key={index} onClick={() => handleAddTag(tag)}>
                            {tag}
                        </li>
                    ))}
                </ul>
            )}

            <div>
                {tags.map((tag, index) => (
                    <span key={index} className='tag'>
                        {tag} <button onClick={() => setTags(tags.filter(t => t !==tag))}>x</button>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default TagList;