import "../styles/Characters.css";
import NavBar from "../components/NavBar";

function Characters() {
    return (
        <div>
            <NavBar />
            <div className="current-characters">
                <div className="character-card">
                    <div className="character-img">
                        <p>image</p>
                    </div>
                    <div>
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ipsa in porro, ea dolorum praesentium laboriosam. Nisi doloremque modi libero dolorem maxime quaerat qui repellendus excepturi minima, iure reprehenderit quo.</p>
                    </div>
                    <div className="edit-deleteBtns">
                        <button>Edit</button>
                        <button>Del</button>
                    </div>
                </div>
                <div className="character-card">
                    <div className="character-img">
                        <p>image</p>
                    </div>
                    <div>
                        <p> description</p>
                    </div>
                    <div className="edit-deleteBtns">
                        <button>Edit</button>
                        <button>Del</button>
                    </div>
                </div>
                <div className="character-card">
                    <div className="character-img">
                        <p>image</p>
                    </div>
                    <div>
                        <p> description</p>
                    </div>
                    <div className="edit-deleteBtns">
                        <button>Edit</button>
                        <button>Del</button>
                    </div>
                </div>
            </div>
            <div className="addCharacterBtn">
                <button>Add Character</button>
            </div>
        </div>
    )
}

export default Characters;