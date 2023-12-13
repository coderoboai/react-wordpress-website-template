import React, { useState, useEffect } from 'react';
import axios from 'axios'
import * as moment from 'moment'
import PropTypes from 'prop-types'
import Loading from '../components/Common/Loading'
import { withStyles, createStyles} from "@material-ui/core/styles";
import styles from "../assets/jss/components/blogStyles"
import {BLOG_API, API_HOME} from '../utils/API'

const useStyles= createStyles(styles)

const SinglePostPage = (props) => {
    const { classes } = props;
    const [state, setState] = useState({
      isLoaded: false,
      post: [],
    });
  
    useEffect(() => {
      const postid = props.location.search.replace('?', '');
  
      console.log('post id = ', postid);
  
      axios
        .get(`?slug=${props.match.params.slug}&_embed`)
        .then((res) =>
          setState({
            post: res.data[0],
            isLoaded: true,
          })
        )
        .catch((err) => console.log(err));
    }, [props.location.search, props.match.params.slug]);
  
    const { post, isLoaded } = state;
  
    console.log(props.match.params.slug);
    console.log(post);
        
        if(isLoaded){
        //change relative urls to absolute    
        const mainContent= post.content.rendered.replace(/\/wp-content/g,`${API_HOME}wp-content`)
        const author= post._embedded['author'][0].name
        //we set up a custom field for author photo because wordpress default was not working
        //const avatar= post._embedded['author'][0].acf.profilePhoto
        return(
            <div>
                <div className="section ">
                    <div className="container">
                        <div className="pb-4 col-xs-12 col-sm-10 offset-sm-1">
                        <h2 dangerouslySetInnerHTML={{__html:post.title.rendered}}/>
                        <div className="d-flex mt-3">
                            {/* <div> 
                                <img src={API_HOME+avatar} alt='author' 
                                className={
                                    classes.avatar+" "+
                                    classes.imgRoundedCircle}/>
                            </div> */}
                            <div>
                                <strong>{author}</strong>
                                <p className={classes.postMeta}>{moment(post.date).format('LL')}</p>
                            </div>
                        </div>
                        </div>
                        <hr/>
                        <div className={classes.content+" justify-content-center"} 
                        dangerouslySetInnerHTML={{__html:mainContent}}/>
                    </div>
                </div>
            </div>
        )
        }
        else {
            return(
                <Loading/>
            )
        }
    }

SinglePostPage.propTypes={
    classes: PropTypes.object.isRequired,
    postid: PropTypes.number
}

export default withStyles(useStyles)(SinglePostPage)