/* DELETE THIS FILE AFTER REFACTOR */

import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import styled from 'styled-components'
import global from '../utils/global_style'

import { rhythm, scale } from '../utils/typography'

class TagTemplate extends React.Component {
   render() {
      console.log('props:', this.props)
      //const post = this.props.data.markdownRemark
      //const siteTitle = get(this.props, 'data.site.siteMetadata.title')
      //const { previous, next } = this.props.pathContext

      const Post = styled.div`
        
        
`

      return (

       <div>
          <h1>Hello world</h1>
       </div>
      )
   }
}

export default TagTemplate

export const pageQuery = graphql`
    query TagIndexQuery {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { draft: { ne: true } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "MMMM Do, YYYY")
                        title
                        featuredImage {
                            childImageSharp {
                                resize(width: 496, height: 262, cropFocus: ENTROPY) {
                                    src
                                    width
                                    height
                                    aspectRatio
                                    originalName
                                }
                            }
                        }
                        topic
                        type
                        rating
                    }
                }
            }
        }
    }
`
