import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Loading from '../components/Common/Loading';
import BlogPost from '../components/Blog/BlogPost';
import BlogPostHorizontal from '../components/Blog/BlogPostHorizontal';
import Pagination from '../components/Blog/Pagination';
import { withStyles, createStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/components/blogStyles";
import { BLOG_API, POSTS_API } from '../utils/API';
import Grid from '@material-ui/core/Grid';
import HomeCarousel from "../components/Common/HomeCarousel"

const useStyles = createStyles(styles);
const featuredCategoryId = 35890; // ToDo: Get this value from slug

const Blog = (props) => {
  const [posts, setPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [totalPages, setTotalPages] = useState([]);
  const [totalFeaturedPages, setTotalFeaturedPages] = useState([]);
  let currentPage = parseInt(props.location.search.replace('?', ''));
  if (!currentPage) currentPage = 1;
  const { classes } = props;
  let featuredCurrentPage = 1;

  useEffect(() => {
    axios.get(BLOG_API + `&per_page=6&page=${currentPage}`)
      .then(res => {
        setTotalPages([...Array(parseInt(res.headers['x-wp-totalpages'])).keys()]);
        setPosts(res.data);
        setIsLoaded(true);
      })
      .catch(err => console.log(err));
  }, [currentPage]);

  useEffect(() => {
    axios.get(BLOG_API + `&per_page=1&page=${1}`)
      .then(res => {
        setLatestPosts(res.data);
      })
      .catch(err => console.log(err));
  }, [currentPage]);

  useEffect(() => {
    axios.get(BLOG_API + `&per_page=3&page=${featuredCurrentPage}&categories=${featuredCategoryId}`)
      .then(res => {
        setFeaturedPosts(res.data);
        setTotalFeaturedPages([...Array(parseInt(res.headers['x-wp-totalpages'])).keys()]);
      })
      .catch(err => console.log(err));
  }, [featuredCurrentPage]);

  if (isLoaded) {
    //const featuredBlogs = posts.filter(post => post.categories.includes('Featured'));
    //.filter(post => !post.categories.includes('featured'));

    console.log(latestPosts)
    return (
      <div className="main">
        <div className={"section " + classes.grayBg}>
          <div className="container">
            <HomeCarousel />

            <hr/>
            <strong>Latest</strong>

            <BlogPostHorizontal id={latestPosts[0].id} />

            <hr/>
            <strong>Featured Blogs!</strong>
            <Grid container spacing={2}>
              {featuredPosts.map((post) => (
                <Grid item key={post.id} xs={12} sm={6} md={4}>
                  <BlogPost id={post.id} />
                </Grid>
              ))}
            </Grid>
            {/* Pagination for Featured Blogs */}
            {totalFeaturedPages.length > 1 && (
              <Pagination totalFeaturedPages={totalFeaturedPages} featuredCurrentPage={featuredCurrentPage} />
            )}

            {/* Blogs Row */}
            <hr/>
            <strong>All</strong>
            <Grid container spacing={2}>
              {posts.map((post) => (
                <Grid item key={post.id} xs={12} sm={6} md={4}>
                  <BlogPost id={post.id} />
                </Grid>
              ))}
            </Grid>

            {/* Pagination for All Blogs */}
              {totalPages.length > 1 && (
              <Pagination totalPages={totalPages} currentPage={currentPage} />
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
};

Blog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Blog);
