import {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getSinglePost} from "../../actions/post";
import PostItem from "../posts/PostItem";
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";

const Post = ({post: {post, loading}, getSinglePost, match}) => {
    useEffect(() => {
        getSinglePost(match.params.id);
    }, [getSinglePost]);

    return (
        <Fragment>
            {loading
                ? <Spinner/>
                : (
                    <Fragment>
                        <Link to='/posts' className='btn'>
                            Back To Posts
                        </Link>
                        <PostItem post={post} showActions={false}/>
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