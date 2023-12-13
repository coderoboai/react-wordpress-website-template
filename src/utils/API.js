//Put API URLs here. For demo this template uses default Wordpress API

export const WORDPRESS_SITE='example.wordpress.com'
export const API_HOME='https://' + WORDPRESS_SITE
export const POSTS_API='/wp/v2/sites/' + WORDPRESS_SITE + '/posts/'
export const HOME_API= POSTS_API + '45'
export const ABOUT_API= POSTS_API + '27'
export const PRODUCTS_API= POSTS_API + 'educators' //custom post type- products
export const PRODUCTS_PAGE_API= POSTS_API + '45'
export const BLOG_API= POSTS_API + '?context=embed'
export const TESTIMONIALS_API=  POSTS_API + 'students' //custom post type - testimonials

//send form-data to Wordpress contact form 7
export const BOOK_DEMO_API="/wp-json/contact-form-7/v1/contact-forms/<form-id>/feedback" 

//pages using default template
export const CAREERS_API= POSTS_API + '45'
export const POLICY_API= POSTS_API + '45'