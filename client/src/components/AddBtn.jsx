import "../styles/AddBtn.css";
import { Link } from "react-router-dom";
import PostIcon from "../images/post_icon.png";
import CharIcon from "../images/char_icon.png";

function AddBtn() {
    const buttonNav = () => {
        document.querySelector(".addBtn-nav").classList.toggle("show");
    }

    return ( 
    <div className="add-button">
        <div className="addBtn-nav">
            <Link to="/createCharacter" className="characterBtn">
                <img src={CharIcon} alt="Nav-Icon" width="75"/>
            </Link>
            <Link to="/createPost" className="postBtn">
                <img src={PostIcon} alt="Nav-Icon" width="75"/>
            
            </Link>
        </div>
        <div>
          <h1 onClick={buttonNav} className="add-post">+</h1>  
        </div>
    </div>
    )
}

export default AddBtn;