import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getAllPosts } from '../../actions/post';

const Posts = ({ getAllPosts, post, loading }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return <div></div>;
};

Posts.propTypes = {
  getAllPosts: PropTypes.func.isRequired
};

const mapStateToProps = ({ post }) => {
  return {
    post: post.posts,
    loading: post.loading
  };
};

export default connect(
  mapStateToProps,
  { getAllPosts }
)(Posts);
