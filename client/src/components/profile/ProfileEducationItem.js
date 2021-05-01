import React from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";

const ProfileEducationItem = (
    {
        education: {
            school,
            degree,
            fieldofstudy,
            current,
            to,
            from,
            description
        }
    }
) => {
    const endDate = current
        ? 'Current'
        : <Moment format='YYYY/MM/DD'>{to}</Moment>;

    return (
        <div>
            <h3 className="text-dark">{school}</h3>
            <p>
                <Moment format='YYYY/MM/DD'>{from}</Moment> - {endDate}
            </p>
            <p>
                <strong>Degree: </strong>{degree}
            </p>
            <p>
                <strong>Field Of Study: </strong>{fieldofstudy}
            </p>
            <p>
                <strong>Description: </strong>{description}
            </p>
        </div>
    );
};

ProfileEducationItem.propTypes = {
    education: PropTypes.object.isRequired,
};

export default ProfileEducationItem;