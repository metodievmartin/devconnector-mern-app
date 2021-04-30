import {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getProfileByUserID} from "../../actions/profile";
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";

const Profile = (
    {
        getProfileByUserID,
        match,
        profile: {profile, loading},
        auth
    }
) => {
    useEffect(() => {
        getProfileByUserID(match.params.id);
    }, [getProfileByUserID, match.params.id]);

    const editProfileLink = auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile?.user._id && (
            <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
            </Link>
        );

    return (
        <Fragment>
            {profile === null || loading
                ? <Spinner/>
                : <Fragment>
                    <Link to='/profiles' className='btn btn-primary'>
                        Back to Profiles
                    </Link>
                    {
                        editProfileLink
                    }
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                    </div>
                </Fragment>
            }
        </Fragment>
    );
};

Profile.propTypes = {
    getProfileByUserID: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, {getProfileByUserID})(Profile);