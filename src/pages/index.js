import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import styled from 'styled-components'
import global from '../utils/global_style'
import Bio from '../components/Bio'
import { rhythm } from '../utils/typography'
import _random from 'lodash/random'

const Post_Preview = styled.div`
   width: 100%;
   
   a {
    color: ${global.color.gray_darkest};
    font-weight: 400;
    text-decoration: none;
    filter: none;
   }
   .post_preview {
    border: transparent solid 2px;
   }
   .post_preview:hover {
    border: ${global.color.blue} solid 2px;
   }
   p {
    margin-bottom: 0;
   }
   h2 {
    margin-top: 0;
    padding-top: ${rhythm(1)};
   }
   
`

const Thumbnail = styled.div`
display: inline-block;
  width: 30%;
  
  img {
    width: 160px !important;
    height: 90px !important;
    object-fit: cover;
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
let bar_cover_length;

const Popularity_Bar_Mask = styled.div`  
  width: ${props => props.rating}px;
  height: 5px;
  margin-top: 14px;
  background: ${global.color.white};
  margin-left: -${props => props.rating}px;
`

const Post_Info = styled.div`
  width: 70%;
  display: inline-block;
  float: right;   
`

const Tags = styled.div`
  span {
   /*rectangle and text*/
   display: inline;
   position: relative;
   color: ${global.color.white};
   padding: 5px 15px;
   font-size: 15.8px;
   margin-left: 12px;
   background-color: ${global.color.gray_light};
   text-transform: capitalize;
   
  }
  
  span:before {
   /*triangle*/
    border-image: none;
    border-style: solid;
    border-width: 15px 13px;
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

                       <h2 style={{ marginBottom: rhythm(1 / 4) }}>
                          {title}
                       </h2>

                       <Thumbnail>
                          <Img sizes={node.frontmatter.featuredImage.childImageSharp.sizes}/>
                       </Thumbnail>

                       <Post_Info>

                          <Tags>
                             <span>{node.frontmatter.topic}</span>
                             &nbsp;&nbsp;&nbsp;
                             <span>{node.frontmatter.type}</span>
                          </Tags>

                          <p>Posted on {node.frontmatter.date}</p>

                          <div style={{ display: 'flex' }}>
                             <p>Popularity:&nbsp;</p>
                             <Popularity_Bar/>
                             <Popularity_Bar_Mask rating={() => {
                                const rating = node.frontmatter.rating
                                const rating_num = Number(rating.split('').slice(0, 1).join())
                                if (rating_num < 5) {
                                   bar_cover_length = (5 - rating_num) * 40 // 40 is 1/3 of the length of the bar (120px)
                                   return bar_cover_length
                                }
                                else return 0
                             }
                             }/>
                          </div>

                       </Post_Info>

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
                        date(formatString: "MMMM Do, YYYY")
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
                        rating
                    }
                }
            }
        }
    }
`
