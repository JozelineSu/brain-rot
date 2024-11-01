import "../styles/NewCharacter.css";

function NewCharacter() {
    return (
        <div className="add-character">
            <div className="searchbar">
             Search
            </div>
            <div className="character-img">
             Add Pic i want pic from google auto placed here that user can change
            </div>
            <div className="character-name">
                <h1>Character name from search bar</h1>
            </div>
            <form className="character-form">
                <input type="text" className="character-desc" />
                <div className="character-btns">
                    <button className="addBtn">Add</button>
                    <button className="cancelBtn">Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default NewCharacter;