import "../styles/AddBtn.css";
import { Link } from "react-router-dom";
/*
 i want user to click button then it will display option to user: character icon (to add facorite character), list icon (to add list), post icon (to add post)

 1. click functionality
 2. create navbar
 3. two classes for navbar 
   - one opacity 0
   - other opacity 1

*/
function AddBtn() {
    const buttonNav = () => {
        document.querySelector(".addBtn-nav").classList.toggle("show");
    
    }

    return ( 
    <div className="add-button">
        <div className="addBtn-nav">
            <h1 className="characterBtn">Char</h1>
            <h1 className="listBtn">List</h1>
            <Link to="/createPost"className="postBtn">Post</Link>
        </div>
        <div>
          <h1 onClick={buttonNav} className="add-post">+</h1>  
        </div>
    </div>
    )
}

export default AddBtn;