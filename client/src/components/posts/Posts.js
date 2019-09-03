import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';
import PostForm from './PostForm';
import PostItem from './PostItem';

import { connect } from 'react-redux';
import { getAllPosts } from '../../actions/post';

const Posts = ({ getAllPosts, posts, loading }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community
      </p>
      <PostForm />
      <div className='posts'>
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getAllPosts: PropTypes.func.isRequired
};

const mapStateToProps = ({ post }) => {
  return {
    posts: post.posts,
    loading: post.loading
  };
};

export default connect(
  mapStateToProps,
  { getAllPosts }
)(Posts);
