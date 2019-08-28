import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({ auth, profile, getCurrentProfile }) => {
  console.log(auth);
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return <div>Dasboard</div>;
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateTProps = ({ auth, profile }) => {
  return {
    auth,
    profile
  };
};

export default connect(
  mapStateTProps,
  { getCurrentProfile }
)(Dashboard);
