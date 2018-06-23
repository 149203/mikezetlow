const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, boundActionCreators }) => {
   const { createPage } = boundActionCreators

   return new Promise((resolve, reject) => {
      resolve(
       graphql(
        `
          {
      all_recent_posts: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000        
      ) {
        edges {
          node {
            fields {
               slug
            }
            html
            id
            frontmatter {
              title
              date
              topic
              type
              rating              
              draft
            }
          }
        }
      }
      
      all_popular_posts: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___rating] }
        limit: 1000        
      ) {
        edges {
          node {
            fields {
               slug
            }
            html
            id
            frontmatter {
              title
              date
              topic
              type
              rating              
              draft
            }
          }
        }
      }
      
    }
        `
       ).then(result => {
          if (result.errors) {
             console.log(result.errors)
             reject(result.errors)
          }

          const all_recent_posts = result.data.all_recent_posts.edges;
          const all_popular_posts = result.data.all_popular_posts.edges;
          create_blog_posts(createPage, all_recent_posts);
          create_tag_pages(createPage, all_recent_posts, 'recent');
          create_tag_pages(createPage, all_popular_posts, 'popular');

       })
      )
   })
}

function create_blog_posts(createPage, posts) {
   /* Create pages for each markdown file. */
   const blog_post = path.resolve(`src/templates/blog-post.js`);

   _.each(posts, (post) => {
      const slug = post.node.fields.slug
      console.log('slug: ', slug)
      createPage({
         path: slug,
         component: blog_post,
         context: {
            slug: slug,
         },
      })
   })
}

function create_tag_pages(createPage, posts, order) {
   const blog_post = path.resolve(`src/templates/blog-post.js`); // TODO: change or make this template handle context
   _.each(posts, (post) => {

      // TODO: make all topics and types uniq
      // create an array of uniq topics, including "all"
      // create an array of uniq types, including "posts"

      // for each slug pass topic, order, and type into context property
      // create a page for each topic-order-type unique combo and pass it context

      console.log('post.node.frontmatter: ', post.node.frontmatter)
      const frontmatter = post.node.frontmatter
      const slug = `/blog/${slugify(frontmatter.topic)}-${order}-${slugify(frontmatter.type)}/`
      console.log('slug: ', slug)
      createPage({
         path: slug,
         component: blog_post, // TODO: CHANGE
         context: {
            slug: slug,
            // pass topic, order, and type into here
         },
      })
   })
}

function slugify(str) {
   if (str === 'video' || str === 'article') str += 's' // pluralize these types, not really necessary though
   return str.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s/g, '-')
}


/**
 * Create pages for tags
 */
function createTagPages(createPage, edges) {
   const tag_template = path.resolve(`src/templates/tags.js`);
   const posts = {};

   edges.forEach(({ node }) => {
      if (node.frontmatter.topic) {
         node.frontmatter.topic.forEach(tag => {
            if (!posts[ tag ]) {
               posts[ tag ] = [];
            }
            posts[ tag ].push(node);
         });
      }
   });

   Object.keys(posts).forEach(tagName => {
      const pageSize = 5;
      const pagesSum = Math.ceil(posts[ tagName ].length / pageSize);

      for (let page = 1; page <= pagesSum; page++) {
         createPage({
            path:
             page === 1
             ? `/tag/${tagName.toLowerCase()}`
             : `/tag/${tagName.toLowerCase()}/page/${page}`,
            component: tag_template,
            context: {
               posts: paginate(posts[ tagName ], pageSize, page),
               tag: tagName,
               pagesSum,
               page,
            },
         });
      }
   });
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
   const { createNodeField } = boundActionCreators

   if (node.internal.type === `MarkdownRemark`) {
      const value = createFilePath({ node, getNode })
      createNodeField({
         name: `slug`,
         node,
         value,
      })
   }
}
