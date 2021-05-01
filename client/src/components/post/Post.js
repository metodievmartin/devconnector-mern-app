import {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getSinglePost} from "../../actions/post";
import PostItem from "../posts/PostItem";
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({post: {post, loading}, getSinglePost, match}) => {
    const postId = match.params.id;

    useEffect(() => {
        getSinglePost(postId);
    }, [getSinglePost, postId]);

    return (
        <Fragment>
            {loading || post === null
                ? <Spinner/>
                : (
                    <Fragment>
                        <Link to='/posts' className='btn'>
                            Back To Posts
                        </Link>
                        <PostItem post={post} showActions={false}/>
                        <CommentForm postId={postId}/>
                        <div className="comments">
                            {post.comments.map(comment =>(
                                <CommentItem key={comment._id} comment={comment} postId={postId}/>
                            ))}
                        </div>
                    </Fragment>
                )}
        </Fragment>
    );
};

Post.propTypes = {
    getSinglePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {getSinglePost})(Post);