import '../styles/EditCharacter.css';
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
        <>

        <div >
            {/*<div className="header">
                <h1>User Pic</h1>
                <h1>{character.characterAuthor}</h1>
            </div>*/}
            </div>

                <p className={`${
                    characterCount === 120 
                    }`}
                >
                    CharacterCount: {characterCount}/120
                </p>
                <form className='character-form' onSubmit={handleUpdateCharacter}>
                    <div>
                        <textarea
                            name="description"
                            className="form-input"
                            value={description}
                            onChange={handleDescChange}
                        >{character.description}</textarea>
                        <textarea
                            name="characterName"
                            className="form-input"
                            value={characterName}
                            onChange={handleCharNameChange}
                        >{character.characterName}</textarea>
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

export default EditCharacter;