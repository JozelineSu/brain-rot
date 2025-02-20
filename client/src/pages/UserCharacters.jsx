import "../styles/Characters.css";
import NavBar from "../components/NavBar";
import AddBtn from "../components/AddBtn";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { REMOVE_CHARACTER} from "../utils/mutations";

import Auth from "../utils/auth"
import { useParams, Link } from "react-router-dom";

function UserCharacters() {
    const { username: userParam } = useParams();

    const { loading, data, error } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });

    const user = data?.me || data?.user || {};

    const [removeCharacter] = useMutation(REMOVE_CHARACTER, {
        update(cache, { data: { removeCharacter }}) {
            const { me } = cache.readQuery({ query: QUERY_ME });

            cache.writeQuery({
                query: QUERY_ME,
                data: {
                    me: {
                        ...me,
                        characters: me.characters.filter(character => character._id !== removeCharacter._id),
                    },
                },
            });
        },
    });

    const handleRemoveCharacter = async (characterId) => {
        try {
            console.log('delete button clicked');
            const { data } = await removeCharacter({
                variables: {
                    characterId: characterId,
                },
            });
            console.log('success removing character', data);
        } catch (err) {
            console.error('error removing post', err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
            <h4>You need to be logged in.</h4>
        );
    }

    if (!user.characters.length) {
        return (
            <div>
                <NavBar/>
                <h3>No Characters yet</h3>
                <AddBtn/>
            </div>
        )
    }

    return (
        <div>
            <NavBar />
            <h2 className='banner'>
                    Viewing {userParam ? `${user.username}'s` : 'your'} characters
            </h2>
            <div className="current-characters">
                {user.characters.map((character) => (
                 <div key={character._id} className="character-card">

                    <div>
                        <h1 className="charName-text">{character.characterName}</h1>
                        <p className="desc-text">{character.description}</p>
                    </div>
                    <div className="edit-deleteBtns">
                        <button className="editChar-btn">
                            <Link to={`/usercharacter/${character._id}`}>Edit</Link>
                        </button>
                        <button onClick={() => handleRemoveCharacter(character._id)}>Delete</button>
                    </div>
                </div>   
                ))}
                
            </div>
            <AddBtn/>
        </div>
    )
}

export default UserCharacters;