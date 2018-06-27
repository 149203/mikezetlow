import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import styled from 'styled-components'
import global from '../utils/global_style'
import Bio from '../components/Bio'
import { rhythm } from '../utils/typography'

const Post_Preview = styled.div`

   width: 100%;
   
   a {
    color: ${global.color.gray_darkest};
    font-weight: 400;
    text-decoration: none;
    filter: none;
   }
   
   p {
    margin-bottom: 0;
   }
   
   .post_preview:hover h2 {
    text-decoration: underline;
   }
   
   .post_preview:hover {
    cursor: pointer;
   }
   
   h2 {
    margin-top: 0;
    margin-bottom: ${rhythm(1 / 4)};
    padding-top: ${rhythm(1)};
   }   
   
   .gatsby-image-wrapper {
    float: left;
    width: 172px;
    margin-right: ${rhythm(1)};
       
    @media(max-width: 559px) {
      width: 100%;
      margin-bottom: ${rhythm(1 / 4)};
      
    }
     
   }
   
`

const Popularity_Bar = styled.div`  
    width: 120px;
    height: 5px;
    margin-top: 14px;    
    /* http://www.colorzilla.com/gradient-editor/#2196f3+3,4caf50+32,fbc02d+63,f44336+97 */
    background: #2196f3;
    background: -moz-linear-gradient(45deg, #2196f3 3%, #4caf50 32%, #fbc02d 63%, #f44336 97%);
    background: -webkit-linear-gradient(45deg, #2196f3 3%,#4caf50 32%,#fbc02d 63%,#f44336 97%);
    background: linear-gradient(45deg, #2196f3 3%,#4caf50 32%,#fbc02d 63%,#f44336 97%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2196f3', endColorstr='#f44336',GradientType=1 );    
`

const Popularity_Bar_Mask = styled.div`  
  width: ${props => props.rating}px;
  height: 5px;
  margin-top: 14px;
  background: ${global.color.white};
  margin-left: -${props => props.rating}px;
`

const Tags = styled.div`
  span {
   /*rectangle and text*/
   display: inline-block;
   position: relative;
   color: ${global.color.white};
   padding: 5px 13px;
   font-size: 14.5px;
   margin-left: 14px;
   background-color: ${global.color.gray_light};
   text-transform: capitalize;
   line-height: 1.3;
  }
  
  span:before {
   /*triangle*/
    border-image: none;
    border-style: solid;
    border-width: 14px 13px;
    width: 1px;
    content: "";
    height: 1px;
    left: -26px;
    position: absolute;
    top: 0;
    border-color: transparent;
    border-right-color: ${global.color.gray_light};
  }
  
  span:after {
   /*circle*/
    background-color: ${global.color.white};
    content: "";
    height: 6px;
    width: 6px;
    left: -2px;
    position: absolute;
    top: 12px;    
    z-index: 999;
    border-radius: 5px;
  }

`

class BlogIndex extends React.Component {
   render() {
      const siteTitle = get(this, 'props.data.site.siteMetadata.title')
      const posts = get(this, 'props.data.allMarkdownRemark.edges')
      //console.log('data: ', get(this, 'props.data'))

      return (
       <div>
          <Helmet title={siteTitle}/>
          <Bio/>
          {posts.map(({ node }) => {
             const title = get(node, 'frontmatter.title') || node.fields.slug
             return (

              <Post_Preview key={node.fields.slug}>
                 <div className="post_preview">
                    <Link to={node.fields.slug}>

                       <h2 className="pseudo_link">
                          {title}
                       </h2>

                       <Img sizes={node.frontmatter.featuredImage.childImageSharp.resize}/>

                       <Tags>
                          <span>{node.frontmatter.topic}</span>
                          &nbsp;&nbsp;&nbsp;
                          <span>{node.frontmatter.type}</span>
                       </Tags>

                       <p>{node.frontmatter.date}</p>

                       <div style={{ display: 'flex' }}>
                          <p>Popularity:&nbsp;</p>
                          <Popularity_Bar/>
                          <Popularity_Bar_Mask rating={() => {
                             const rating = node.frontmatter.rating
                             const rating_num = Number(rating.split('').slice(0, 1).join())
                             if (rating_num < 5) {
                                const bar_cover_length = (5 - rating_num) * 40 // 40 is 1/3 of the width of the bar, which is 120px
                                return bar_cover_length
                             }
                             else return 0
                          }
                          }/>
                       </div>

                    </Link>
                 </div>
              </Post_Preview>

             )
          })}
       </div>
      )
   }
}

export default BlogIndex

/* https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-sharp
Information on Sharp, try CENTER or ATTENTION or ENTROPY for cropFocus

*/
export const pageQuery = graphql`
    query IndexQuery {
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
