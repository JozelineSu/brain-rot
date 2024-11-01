import "../styles/Lists.css";
import NavBar from "../components/NavBar";

function Lists() {
    return (
        <div>
            <NavBar />
            <div className="user-lists">
                <div className="list">
                    <h1>List Title</h1>
                    <div className="list-btns">
                        <button className="viewBtn">View</button>
                        <button className="editBtn">Edit</button>
                        <button className="delBtn">Delete</button>
                    </div>
                </div>
                <div className="list">
                    <h1>List Title</h1>
                    <div className="list-btns">
                        <button className="viewBtn">View</button>
                        <button className="editBtn">Edit</button>
                        <button className="delBtn">Delete</button>
                    </div>
                </div>
                <div className="list">
                    <h1>List Title</h1>
                    <div className="list-btns">
                        <button className="viewBtn">View</button>
                        <button className="editBtn">Edit</button>
                        <button className="delBtn">Delete</button>
                    </div>
                </div>
            </div>
            <div className="addListBtn">
                <button>Add List</button>
            </div>
        </div>
    )
}

export default Lists;