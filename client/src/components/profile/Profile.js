import {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getProfileByUserID} from "../../actions/profile";
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperienceItem from "./ProfileExperienceItem";
import ProfileEducationItem from "./ProfileEducationItem";
import ProfileGithub from "./ProfileGithub";

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

    const experiencesList = (
        <Fragment>
            {profile?.experience.map(experience => (
                <ProfileExperienceItem key={experience._id} experience={experience}/>
            ))}
        </Fragment>
    );

    const educationList = (
        <Fragment>
            {profile?.education.map(education => (
                <ProfileEducationItem key={education._id} education={education}/>
            ))}
        </Fragment>
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
                        <ProfileTop profile={profile}/>
                        <ProfileAbout profile={profile}/>
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            {profile.experience.length > 0
                                ? experiencesList
                                : <h4>No experience credentials yet...</h4>}
                        </div>
                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            {profile.education.length > 0
                                ? educationList
                                : <h4>No education credentials yet...</h4>}
                        </div>
                        {profile.githubusername &&
                            <ProfileGithub username={profile.githubusername}/>}
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