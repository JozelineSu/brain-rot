import '../styles/CreatePost.css';

function CreatePost() {
    return (
        <div className="create-post">
            <div className="header">
                <div>
                    <h1>User Pic</h1>
                </div>
                <div>
                    <h1>UserName</h1>
                </div>
            </div>
            <form className="post-form">
                <input type="text" className="user-post" />
                <div className="post-buttons">
                    <button>Add Tag</button>
                    <button>Add Poll</button>
                    <button>Add Pic</button>
                </div>
                <button className="submit-post">Post</button>
            </form>
        </div>
    )
}

export default CreatePost;