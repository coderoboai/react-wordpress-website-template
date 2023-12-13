mport React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Create a component that displays a WordPress blog post
const WordPressBlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://your-wordpress-site.com/wp-json/wp/v2/posts?slug=${slug}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const posts = await response.json();

        if (posts.length > 0) {
          setPost(posts[0]);
        } else {
          console.error(`No post found with the slug ${slug}`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPost();
  }, [slug]);

  return (
    <div>
      {post ? (
        <div>
          <h2>{post.title.rendered}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WordPressBlogPost;

