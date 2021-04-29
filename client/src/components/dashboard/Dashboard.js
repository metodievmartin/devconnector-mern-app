import PropTypes from "prop-types";
import {Fragment} from "react";
import {connect} from "react-redux";
import {getCurrentProfile} from "../../actions/profile";
import {useEffect} from "react";
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";
import DashboardActions from "./DashboardActions";

const Dashboard = (
    {
        auth: {user},
        profile: {profile, loading},
        getCurrentProfile
    }
) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return (
        loading && profile === null
            ? (<Spinner/>)
            : (
                <Fragment>
                    <h1 className="large text-primary">
                        Dashboard
                    </h1>
                    <p className="lead"><i className="fas fa-user"/> Welcome {user && user.name}</p>
                    {profile !== null ? (
                        <Fragment>
                            <DashboardActions />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <p>You have not yet setup a profile, please add some info</p>
                            <Link to='/create-profile' className='btn btn-primary m-1'>
                                Create profile
                            </Link>
                        </Fragment>
                    )}
                </Fragment>
            )
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);