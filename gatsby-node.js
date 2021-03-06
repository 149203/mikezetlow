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
          create_blog_posts(createPage, all_recent_posts);
          create_tag_pages(createPage, all_recent_posts);
       })
      )
   })
}

function create_blog_posts(createPage, posts) {

   _.each(posts, (post) => {
      const slug = post.node.fields.slug
      const topic = post.node.frontmatter.topic
      console.log('individual blog post slug: ', slug)
      createPage({
         path: slug,
         component: path.resolve(`src/templates/blog-post.js`),
         context: {
            slug, // sends the context of the slug so that the query on the template page can query for just that slug
            topic,
         },
      })
   })
}

function create_tag_pages(createPage, posts) {

   const topics = _.uniq(_.map(posts, post => post.node.frontmatter.topic))
   const orders = [ 'recent', 'popular' ]

   _.forEach(topics, topic => {
      _.forEach(orders, order => {

         const slug = `/${order}/${_.kebabCase(topic)}`
         console.log(`I'm creating a slug that look like: ${slug}`)
         createPage({
            path: slug,
            component: path.resolve(`src/pages/index.js`),
            context: {
               slug
            },
         })
      })
   })

   _.forEach(orders, order => {

      const slug = `/${order}/`
      console.log(`I'm creating a slug that look like: ${slug}`)

      createPage({
         path: slug,
         component: path.resolve(`src/pages/index.js`),
         context: {
            slug
         },
      })
   })
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
