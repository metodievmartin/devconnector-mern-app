import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addComment} from "../../actions/post";
import {setAlert} from "../../actions/alert";

const CommentForm = ({addComment, setAlert, postId}) => {
    const [text, setText] = useState('');

    const onSubmit = e => {
        e.preventDefault();

        if (text.trim().length === 0) {
            setAlert('Cannot submit an empty comment')
            return;
        }

        addComment(postId, {text});
        setText('');
    };

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave a comment...</h3>
            </div>
            <form onSubmit={onSubmit} className="form my-1">
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Leave a comment..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                    required
                />
                <input type="submit" className="btn btn-dark my-1" value="Submit"/>
            </form>
        </div>
    );
};

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
};

export default connect(null, {addComment, setAlert})(CommentForm);