import '../styles/Characters.css';

import { Navigate, useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import AddBtn from "../components/AddBtn";
import NavBar from "../components/NavBar";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from '../utils/auth';

const Characters = () => {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });

    const user = data?.me || data?.user || {};

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/me" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
            <h4>You need to be logged in.</h4>
        );
    }

    return (
        <>
            <div>
                <NavBar/>
                <h2>
                    Viewing {userParam ? `${user.username}'s` : 'your'} characters
                </h2>
                {user.characters.map((character) => (
                    <div key={character._id} className="character-card">
                        <div className="character-img">
                            <p>image</p>
                        </div>
                        <div className="character">
                            <h1>{character.characterName}</h1>
                            <p>{character.description}</p>
                        </div>
                    </div>

                ))
                }
                <AddBtn/>

            </div>
        
        </>
    )
}

export default Characters;