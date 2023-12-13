import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import PropTypes from 'prop-types';
import Loading from '../Common/Loading';
import Card from '../Card/Card';
import CardBody from '../Card/CardBody';
import Button from '../Common/Button';
import { withStyles, createStyles } from "@material-ui/core/styles";
import Person from '@material-ui/icons/Person';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { API_HOME, POSTS_API } from '../../utils/API';
import styles from "../../assets/jss/components/blogStyles";
import { blogUrl } from '../../utils/routes';
import Avatar from '@material-ui/core/Avatar';

const useStyles = createStyles(styles);
const excerptSize = 200;

const BlogPost = (props) => {
  const { id } = props;
  const { classes } = props;
  const [postData, setPostData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get( POSTS_API + `${id}/?_embed`)
      .then(res => {
        setPostData(res.data);
        setLoaded(true);
      })
      .catch(err => console.log(err));
  }, [id]);

  if (isLoaded) {
    let mediaUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
    if (
      postData &&
      postData._embedded &&
      postData._embedded['wp:featuredmedia'] &&
      postData._embedded['wp:featuredmedia'][0] &&
      postData._embedded['wp:featuredmedia'][0].source_url
    ) {
      mediaUrl = postData._embedded['wp:featuredmedia'][0].source_url;
    }

    const author = postData._embedded['author'][0].name;
    const externalLink = 0; //postData.link;
    const { title, date, excerpt, slug } = postData;
    const truncatedExcerpt = excerpt.rendered.slice(0, excerptSize) + (excerpt.rendered.length > excerptSize ? '...' : '');

    return (
      <Card className={`${classes.card} d-flex my-1 row`} style={{height:'640px'}}>
        {mediaUrl && (
          <CardBody
            className={`col-xs-12 text-center`}
          >
            <Avatar
              alt="featured-media"
              src={mediaUrl}
              className={`${classes.avatar} ${classes.cardImage}`}
              style={{
                maxWidth: "auto", // Set your desired max width
                height: "240px", // Set your desired max height
              }}
            />
          </CardBody>
        )}
        <CardBody className={`col-xs-12 ${classes.cardBody}`}>
        
          <h3
            dangerouslySetInnerHTML={{ __html: title.rendered }}
            className={`${classes.title} mt-0`}
          />

          <div className={classes.postMeta + " mb-2"}>
            <span className="mr-3">
              <Person /> {author}{" "}
            </span>
            <span>
              <CalendarToday /> {moment(date).format("LL")}
            </span>
          </div>

          <div className={classes.cardExcerpt} style={{ fontSize: "16px" }}>
            {/* Ensure consistent height for the card */}
            <div className={classes.cardExcerptInner}>
              <div dangerouslySetInnerHTML={{ __html: truncatedExcerpt }} />
            </div>
          </div>

        <div style={{ display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'flex-end', 
                      margin: '0px 0px' }}>
          {
            <Link to={blogUrl + "/" + slug}>
              <Button color="primary">Read More</Button>
            </Link>
          }
        </div>
        </CardBody>
      </Card>
    );
  } else {
    return <Loading />;
  }
};

BlogPost.propTypes = {
  author: PropTypes.number,
  excerpt: PropTypes.string,
  title: PropTypes.string,
  media: PropTypes.number,
  date: PropTypes.string,
  id: PropTypes.number,
  slug: PropTypes.string,
};

export default withStyles(useStyles)(BlogPost);