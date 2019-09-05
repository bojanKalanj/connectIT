import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

import { connect } from 'react-redux';
import { getPost } from '../../actions/post';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return <div>post</div>;
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    post: state.post
  };
};

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
