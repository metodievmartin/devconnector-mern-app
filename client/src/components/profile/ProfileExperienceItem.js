import React from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";

const ProfileExperienceItem = (
    {
        experience: {
            company,
            title,
            location,
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
            <h3 className="text-dark">{company}</h3>
            <p>
                <Moment format='YYYY/MM/DD'>{from}</Moment> - {endDate}
            </p>
            <p>
                <strong>Location: </strong>{location}
            </p>
            <p>
                <strong>Position: </strong>{title}
            </p>
            <p>
                <strong>Description: </strong>{description}
            </p>
        </div>
    );
};

ProfileExperienceItem.propTypes = {
    experience: PropTypes.object.isRequired,
};

export default ProfileExperienceItem;