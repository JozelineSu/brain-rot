import '../styles/Comments.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_POST } from '../utils/queries';

const SinglePost = () => {
    const { postId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_POST, {
        variables: { postId: postId }
    });
    
    const post = data?.post || {};
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!post.comments.length) {
        return (
            <div className='comment-section'>
                <h3>No comments</h3>

                
                        <CommentForm postId={post._id}/>
                   
            </div>
    )
    
    }
    return (
        <div className='comment-section'>
            <div className="comments-display">
                {
                    post.comments.map((comment) => (
                        <div className='user-comment' key={comment._id} >
                            
                                <h4 className="comment-user">
                                    {comment.commentAuthor}
                                </h4>
                                <p className="comment-text">
                                    {comment.commentText}
                                </p>
                            
                        </div>

                    ))
                }
            </div>
            
                
                
                    <CommentForm postId={post._id}/>
                
            
        </div>
    )
}



export default SinglePost;