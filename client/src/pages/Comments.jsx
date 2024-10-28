import '../styles/Comments.css';

function Comments() {
    return (
        <div className='comment-section'>
            <div className='comments-display'>
                <h1 className='go-back'>back</h1>
                <div className='comments'>
                    <div className='user-comment'>
                        <div>
                            user pic
                        </div>
                        <div className='text-comment'>
                            <p>this is my comment</p>
                        </div>
                    </div>
                    <div className='user-comment'>
                        <div>
                            user pic
                        </div>
                        <div className='text-comment'>
                            <p>this is my comment</p>
                        </div>
                    </div>
                    <div className='user-comment'>
                        <div>
                            user pic
                        </div>
                        <div className='text-comment'>
                            <p>this is my comment</p>
                        </div>
                    </div>
                </div>
            </div>
            <form className="comment-form">
                <input type="text"></input>
                <button>/\</button>
            </form>
        </div>
    )
}

export default Comments;