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
      console.log('individual blog post slug: ', slug)
      createPage({
         path: slug,
         component: path.resolve(`src/templates/blog-post.js`),
         context: {
            slug, // sends the context of the slug so that the query on the template page can query for just that slug
         },
      })
   })
}

function create_tag_pages(createPage, posts) {

   const topics = _.uniq(_.map(posts, post => post.node.frontmatter.topic).concat([ 'all' ]))
   const orders = [ 'recent', 'popular' ]
   const types = _.uniq(_.map(posts, post => post.node.frontmatter.type).concat([ 'posts' ]))

   _.forEach(topics, topic => {
      _.forEach(orders, order => {
         _.forEach(types, type => {

            const slug = `/${order}/${slugify(topic)}-${slugify(type)}` // FRAGILE: the type has to be one word
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
   })

}

function slugify(str) {
   if (str === 'video' || str === 'article') str += 's' // pluralize these types, not really necessary though
   return _.kebabCase(str) //str.toLowerCase().replace(/[^a-z0-9\s_\-]/g, '').replace(/\s/g, '-')
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
