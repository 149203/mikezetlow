import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { rhythm, scale } from '../utils/typography'
import Img from 'gatsby-image'
import _round from 'lodash/round'

class Template extends React.Component {

   constructor(props) {
      super(props)
      this.update_responsive_layout = this.update_responsive_layout.bind(this)
      this.state = {
         responsive: {
            hero_pic_display: `none`,
            hero_content_float: ``,
            hero_content_margin_right: `auto`,
         }
      }
   }

   update_responsive_layout() {
      // Magic numbers
      const hero_content_margin_right = 30
      const pic_original_width = 624
      const pic_original_height = 1080
      const hero_content_width = 799
      //const hero_content_width = document.getElementById('hero_content').offsetWidth + hero_content_margin_right // 799

      // Maths
      const pic_original_aspect_ratio = _round(pic_original_width / pic_original_height, 4) // 624 / 1080 = 0.5778
      const screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      const screen_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
      const remaining_width = screen_width - hero_content_width
      const pic_dom_width = _round(screen_height * pic_original_aspect_ratio, 4)
      let responsive = { ...this.state.responsive } // dupe state for the changes that follow
      console.log('screen_width : ', screen_width)
      console.log('screen_height : ', screen_height)
      console.log('remaining_width : ', remaining_width)
      console.log('pic_dom_width * 2 : ', pic_dom_width * 2)

      if (screen_width >= hero_content_width + pic_dom_width) { // if there's room for a profile pic

         if (remaining_width >= pic_dom_width * 2) {
            console.log(`WIDE SCREEN`)
            responsive.hero_pic_display = `block`
            responsive.hero_content_float = ``
            responsive.hero_content_margin_right = `auto`
            this.setState({ responsive })
         }
         else {
            console.log(`STANDARD SCREEN`)
            responsive.hero_pic_display = `block`
            responsive.hero_content_float = `right`
            responsive.hero_content_margin_right = pic_dom_width + hero_content_margin_right
            this.setState({ responsive })
         }
      }

      else {
         console.log(`MOBILE / PORTRAIT SCREEN`)
         responsive.hero_pic_display = `none`
         responsive.hero_content_float = ``
         responsive.hero_content_margin_right = `auto`
         this.setState({ responsive })
      }

   }

   componentDidMount() {
      window.addEventListener("resize", this.update_responsive_layout);
      this.update_responsive_layout()
   }

   componentWillUnmount() {
      window.removeEventListener("resize", this.update_responsive_layout);
   }

   render() {

      const Home = styled.div`             
        a {
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline !important;
        }   
      `

      const { location, children } = this.props
      let header
      let profile_pic_opacity = `1`
      let profile_pic_blur = `inherit`

      let rootPath = `/`
      if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
         rootPath = __PATH_PREFIX__ + `/`
      }

      if (location.pathname === rootPath) {
         header = (
          <h1
           style={{
              ...scale(1.25),
              marginBottom: rhythm(1.25),
              marginTop: 0,
           }}
          >
             <Link
              style={{
                 boxShadow: 'none',
                 textDecoration: 'none',
                 color: 'inherit',
                 fontWeight: '700',
                 cursor: 'default',
              }}
              to={'/'}
             >
                Hi, I'm Mike Zetlow.
             </Link>
          </h1>
         )
      }

      else {
         profile_pic_opacity = `0.3`
         profile_pic_blur = `blur(5px)`
         header = (
          <h3
           style={{
              marginTop: 0,
              marginBottom: rhythm(-1),
           }}
          >
             <Link
              style={{
                 boxShadow: 'none',
                 color: 'inherit',
                 fontWeight: '700',
              }}
              to={'/'}
             >
                <Home>
                   MikeZetlow.com
                </Home>

             </Link>
          </h3>
         )
      }

      const Profile_Pic = styled.div`
        img {
          display: ${this.state.responsive.hero_pic_display};
          position: fixed;
          right: 0;
          bottom: 0;
          margin-bottom: 0;
          opacity: ${profile_pic_opacity};
          filter: ${profile_pic_blur};
          max-height: 100vh;
          z-index: -5000;
        }        
      `
      return (
       <div>
          <Profile_Pic>
             <img srcSet={this.props.data.hero_pic.childImageSharp.sizes.srcSet} id="hero_pic" title="Mike Zetlow"/>
             {/*<Img
              id="hero_pic"
              title="Mike Zetlow"
              sizes={this.props.data.hero_pic}
             />*/}
          </Profile_Pic>
          <div
           id="hero_content"
           style={{
              marginLeft: `auto`,
              marginRight: this.state.responsive.hero_content_margin_right,
              float: this.state.responsive.hero_content_float,
              maxWidth: rhythm(24),
              padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
           }}
          >
             {header}
             {children()}
          </div>
       </div>
      )
   }
}

export default Template

export const pageQuery = graphql`
    query ProfilePic {
        hero_pic: file(name: {eq: "mike-zetlow-profile-picture"}) {
            childImageSharp {
                sizes {
                    srcSet
                }
            }
        }
    }
`
