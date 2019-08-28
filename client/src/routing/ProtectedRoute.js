import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';

// Redux
import { connect } from 'react-redux';

const ProtectedRoute = props => {
  var { isAuthenticated, loading } = props;
  if (!loading) {
    if (isAuthenticated) {
      return <Route {...props} />;
    }

    if (!isAuthenticated) {
      return <Redirect to='/login' />;
    }
  } else {
    return <div>Loading</div>;
  }
};

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = ({ auth }) => {
  return {
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading
  };
};

export default connect(mapStateToProps)(ProtectedRoute);

// MAYBE A BETTER WAY
// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

// const PrivateRoute = ({
//   component: Component,
//   auth: { isAuthenticated, loading },
//   ...rest
// }) => (
//   <Route
//     {...rest}
//     render={props =>
//       !isAuthenticated && !loading ? (
//         <Redirect to='/login' />
//       ) : (
//         <Component {...props} />
//       )
//     }
//   />
// );

// PrivateRoute.propTypes = {
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(mapStateToProps)(PrivateRoute);
