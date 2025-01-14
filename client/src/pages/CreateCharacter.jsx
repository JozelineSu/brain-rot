import "../styles/CreateCharacter.css";

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { ADD_CHARACTER } from '../utils/mutations';
import { QUERY_CHARACTERS, QUERY_ME, QUERY_USER } from '../utils/queries';

import Auth from '../utils/auth';

function CreateCharacter() {
    const [description, setDescription] = useState('');
    const [characterName, setCharacterName] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const navigate = useNavigate();
    const username = Auth.getProfile().data.username;

    const [addCharacter, { error }] = useMutation
    (ADD_CHARACTER, {
        refetchQueries: [
            QUERY_CHARACTERS,
            'getCharacters',
            QUERY_ME,
            'me'
        ]
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data} = await addCharacter({
                variables: {
                    description,
                    characterName,
                    characterAuthor: Auth.getProfile().username
                },
            });
            console.log('success adding new post:', data);

            setDescription('');
            setCharacterName('');
            navigate('/myCharacters');
        } catch (err) {
            console.error('Error making new post:', err);
        }
    };

    const handleDescChange = (event) => {
        const { name, value } = event.target;

        if (name === 'description' && value.length <= 120) {
            setDescription(value);
            setCharacterCount(value.length);
        }
    };

    const handleCharNameChange = (event) => {
        const { name, value } = event.target;

        if (name === 'characterName') {
            setCharacterName(value);
        }
    };

    return (
        <div className="add-character">
            {Auth.loggedIn() ? (
            <>
                <div className="header">
                    <div>
                        <h1>User Pic</h1>
                        <h1>{username}</h1>
                    </div>
                </div>

                <p className={`${
                    characterCount === 120 || error ? 'text-danger' : ''
                }`}
                >
                haracterCount: {characterCount}/280
                </p>

                <form className="character-form" onSubmit={handleFormSubmit}>
                    <div>
                        <textarea
                            name="characterName"
                            value={characterName}
                            className="form-input"
                            onChange={handleCharNameChange}
                        ></textarea>
                        <textarea
                            name="description"
                            value={description}
                            className="form-input"
                            onChange={handleDescChange}
                        ></textarea>

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


                    </div>

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

export default CreateCharacter;