import '../styles/Comments.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_POST } from '../utils/queries';

const SinglePost = () => {
    const { postId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_POST, {
        variables: { postId: postId },
    });
    
    const post = data?.post || {};
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!post.comments.length) {
        return (
            <>
        <h3>No comments</h3>
        <div>
                <CommentForm postId={post._id}/>
        </div>    
            </>
    )
    
    }
    return (
        <>
        
        <div className='comment-section'>
            {
                post.comments.map((comment) => (
                    <div key={comment._id}>
                        <div className="comment-card">
                            <h4 className="comment-user">
                                {comment.commentAuthor}
                            </h4>
                            <p className="comment-text">
                                {comment.commentText}
                            </p>
                        </div>
                    </div>

                ))
            }
            <div>
                <CommentForm postId={post._id}/>
            </div>
        </div>
        </>
    )
}



export default SinglePost;