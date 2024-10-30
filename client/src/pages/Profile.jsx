import "../styles/Profile.css";
import NavBar from "../components/NavBar";
import AddBtn from "../components/AddBtn";

function Profile() {
    return (
        <div className="profile">
            <NavBar />           
                
                    <div className="header">
                        <div className="header-pic">
                            Banner Pic
                        </div>
                        <div className="user-pic">
                            User Pic
                        </div>
                        <div className="profile-nav">
                            <p>my followers</p>
                            <p>my posts</p>
                            <p>lists</p>
                            <p>characters</p>
                        </div>    
                    </div>                 
                 

 

                <div className="user-likes">
                    <div className="liked-post">
                        <h1>Post user liked</h1>
                    </div>
                    <div className="liked-post">
                        <h1>Post user ked</h1>
                    </div>
                    <div className="liked-post">
                        <h1>Post user liked</h1>
                    </div>
                </div>
                <AddBtn />
        </div>
    )
}

export default Profile;