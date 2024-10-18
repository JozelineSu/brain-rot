import "../styles/Profile.css";
import NavBar from "../components/NavBar";
import AddPostBtn from "../components/AddPostBtn";

function Profile() {
    return (
        <div>
            <NavBar />
            <div>
                <div className="banner">
                    <div className="banner-pic">
                        Banner Pic
                    </div>
                    <div className="user-pic">
                        User Pic
                    </div>
                </div> 

                <div className="lists-characters">
                    <p>lists</p>
                    <p>characters</p>
                </div> 

                <div className="user-likes">
                    user Likes
                </div>
                <AddPostBtn />
            </div>

        </div>
    )
}

export default Profile;