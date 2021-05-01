import {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getGithubRepos} from "../../actions/profile";
import GithubRepoItem from "./GithubRepoItem";
import Spinner from "../layout/Spinner";

const ProfileGithub = ({getGithubRepos, username, repos}) => {
    useEffect(() => {
        getGithubRepos(username);
    }, [getGithubRepos, username]);

    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">
                <i className="fab fa-github"/> Github Repos
            </h2>
            {repos && repos.length > 0
                ? repos.map(repo => <GithubRepoItem key={repo.id} repo={repo} />)
                : <Spinner/>}
        </div>
    );
};

ProfileGithub.propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    repos: state.profile.repos,
});

export default connect(mapStateToProps, {getGithubRepos})(ProfileGithub);