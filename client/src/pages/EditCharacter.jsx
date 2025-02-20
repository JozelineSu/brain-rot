
import { useQuery, useMutation } from "@apollo/client";
import { useState } from 'react';

import { useParams, useNavigate } from "react-router-dom";

import { QUERY_SINGLE_CHARACTER } from "../utils/queries";
import { UPDATE_CHARACTER } from "../utils/mutations.js";

function EditCharacter() {
    const [characterCount, setCharacterCount] = useState(0);
    const [description, setDescription] = useState("");
    const [characterName, setCharacterName] = useState('');
    const { characterId } = useParams();
    const [updateCharacter] = useMutation(UPDATE_CHARACTER);
    const navigate = useNavigate();

    const { loading, data } = useQuery(QUERY_SINGLE_CHARACTER, {
        variables: { characterId },
        onCompleted: (data) => {
            setDescription(data.character.description);
            setCharacterName(data.character.characterName);
            setCharacterCount(data.character.description.length);
        },
    });
    
    const character = data?.character || {};
    if (loading) {
        return <div>Loading...</div>
    }

    const handleDescChange = (event) => {
        const { value } = event.target;
        setDescription(value);
        setCharacterCount(value.length);
    };

    const handleCharNameChange = (event) => {
        const { value } = event.target;
        setCharacterName(value);
    };

    const handleUpdateCharacter = async (event) => {
        event.preventDefault();
        try {
            const { data } = await updateCharacter({
                variables: { characterId, description, characterName},
            });
            console.log("characster updated:", data);
            navigate('/myCharacters');
        } catch (err) {
            console.error("error updating character:", err);
        }
    };

    return (
        <div className="create-post">

                <p className={`${
                    characterCount === 280 
                    }`}
                >
                    CharacterCount: {characterCount}/280
                </p>
                <form className='post-form' onSubmit={handleUpdateCharacter}>
                    <div className="addChar-container">
                        <div className="addChar-inputBox">
                            <h2>Character Name:</h2>
                            <textarea
                                name="characterName"
                                className="charName-input"
                                value={characterName}
                                onChange={handleCharNameChange}
                            >{character.characterName}</textarea> 
                              
                        </div>

                        <div className="addChar-inputBox">
                            <h2>Description:</h2>
                            <textarea
                                name="description"
                                className="description-input"
                                value={description}
                                onChange={handleDescChange}
                            >{character.description}</textarea>    
                        </div>
                    </div>

                    <div className="add-postContainer">
                        <button className="add-postBtn" type="submit">
                            +
                        </button>
                    </div>
                </form>

        </div>
    )
    
}

export default EditCharacter;