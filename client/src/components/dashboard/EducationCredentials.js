import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

const EducationCredentials = ({ education = [], deleteEducation }) => {
  var educations = education.map(e => {
    return (
      <tr key={e._id}>
        <td>{e.school}</td>
        <td className='hide-sm'>{e.degree}</td>
        <td>
          <Moment format='YYYY/MM/DD'>{moment.utc(e.from)}</Moment> -{' '}
          {e.to === null ? (
            ' Now'
          ) : (
            <Moment format='YYYY/MM/DD'>{moment.utc(e.to)}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={() => deleteEducation(e._id)}
            className='btn btn-danger'
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    education.length > 0 && (
      <Fragment>
        <h2 className='my-2'>Education Credentials</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>School</th>
              <th className='hide-sm'>Degree</th>
              <th className='hide-sm'>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <Fragment>{educations}</Fragment>
          </tbody>
        </table>
      </Fragment>
    )
  );
};

EducationCredentials.propTypes = {
  education: PropTypes.array
};

const mapStateToProps = ({ profile }) => ({
  education: profile.profile.education,
  deleteEducation: PropTypes.func.isRequired
});

export default connect(
  mapStateToProps,
  { deleteEducation }
)(EducationCredentials);
