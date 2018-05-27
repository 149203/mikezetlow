import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import Bio from '../components/Bio'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
   render() {
      const siteTitle = get(this, 'props.data.site.siteMetadata.title')
      const posts = get(this, 'props.data.allMarkdownRemark.edges')

      return (
       <div>
          <Helmet title={siteTitle}/>
          <Bio />
          {posts.map(({ node }) => {
             const title = get(node, 'frontmatter.title') || node.fields.slug
             return (
              <div key={node.fields.slug}>
                 <Link style={{
                    boxShadow: 'none',
                    textDecoration: 'none',

                 }} to={node.fields.slug}>

                    <h2
                     style={{
                        marginBottom: rhythm(1 / 4),
                     }}
                    >

                       {title}

                    </h2>

                    <Img sizes={node.frontmatter.featuredImage.childImageSharp.sizes} />


                    <small>{node.frontmatter.date}</small>
                    <p dangerouslySetInnerHTML={{ __html: node.excerpt }}/>
                 </Link>
              </div>
             )
          })}
       </div>
      )
   }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            rating
            featuredImage {
              childImageSharp {
                sizes(maxWidth: 100) {
                  ...GatsbyImageSharpSizes
                }
              }
            }              
            topic
            type
          }
        }
      }
    }
  }
`
