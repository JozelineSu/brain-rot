import '../styles/Comments.css';

function Comments() {
    return (
        <div className='comment-section'>
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
    )
}

export default Comments;