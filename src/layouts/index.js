import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { rhythm, scale } from '../utils/typography'
import profile_pic from './mike_zetlow_profile_picture.jpg'

class Template extends React.Component {

   constructor(props) {
      super(props)
      this.update_responsive_layout = this.update_responsive_layout.bind(this)
      this.state = {
         responsive: {
            hero_content_margin_left: `auto`,
            hero_content_margin_right: `auto`,
            hero_content_float: ``,
            hero_pic_display: `block`
         }
      }
   }

   update_responsive_layout() {
      const hero_pic = document.getElementById('hero_pic')
      const hero_content = document.getElementById('hero_content')
      const screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      let responsive = { ...this.state.responsive }

      // https://stackoverflow.com/a/626505
      const hero_pic_width = hero_pic.clientWidth + 30 // arbitrary white space to make look better
      const hero_content_width = hero_content.clientWidth
      console.log('Hero pic has width: ', hero_pic_width)
      console.log('Hero content has width: ', hero_content_width)
      console.log('Screen has width: ', screen_width)
      const wide_content_width = (hero_pic_width * 2) + hero_content_width
      const content_width = hero_pic_width + hero_content_width

      if (screen_width < content_width) {
         console.log(`MOBILE VIEW`)
         responsive.hero_content_margin_left = `auto`
         responsive.hero_content_margin_right = `auto`
         responsive.hero_content_float = ``
         responsive.hero_pic_display = `none`
         this.setState({ responsive })
      }
      else if (screen_width >= content_width && screen_width < wide_content_width) {
         console.log(`STANDARD SCREEN VIEW`)
         responsive.hero_content_margin_left = `auto`
         responsive.hero_content_margin_right = hero_pic_width
         responsive.hero_content_float = `right`
         responsive.hero_pic_display = `block`
         this.setState({ responsive })
      }
      else if (screen_width >= wide_content_width) {
         console.log(`WIDE SCREEN VIEW`)
         responsive.hero_content_margin_left = `auto`
         responsive.hero_content_margin_right = `auto`
         responsive.hero_content_float = ``
         responsive.hero_pic_display = `block`
         this.setState({ responsive })
      }

   }

   componentDidMount() {
      window.addEventListener("resize", this.update_responsive_layout);
      const hero_pic = document.getElementById('hero_pic')
      const hero_content = document.getElementById('hero_content')
      const screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      let responsive = { ...this.state.responsive }
      hero_pic.onload = () => {
         // https://stackoverflow.com/a/626505
         const hero_pic_width = hero_pic.clientWidth + 30 // arbitrary white space to make look better
         const hero_content_width = hero_content.clientWidth
         console.log('Hero pic has width: ', hero_pic_width)
         console.log('Hero content has width: ', hero_content_width)
         console.log('Screen has width: ', screen_width)
         const wide_content_width = (hero_pic_width * 2) + hero_content_width
         const content_width = hero_pic_width + hero_content_width

         if (screen_width < content_width) {
            console.log(`MOBILE VIEW`)
            responsive.hero_pic_display = `none`
            this.setState({ responsive })
         }
         else if (screen_width >= content_width && screen_width < wide_content_width) {
            console.log(`STANDARD SCREEN VIEW`)
            responsive.hero_content_float = `right`
            responsive.hero_content_margin_right = hero_pic_width
            this.setState({ responsive })
         }
         else if (screen_width >= wide_content_width) {
            console.log(`WIDE SCREEN VIEW`)
            this.setState({ responsive })
         }
      }
   }

   componentWillUnmount() {
      window.removeEventListener("resize", this.update_responsive_layout);
   }

   render() {

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
              }}
              to={'/'}
             >
                {/*<img
                 src={profile_pic_small}
                 alt={`Mike Zetlow`}
                 style={{
                    marginRight: rhythm(1 / 2),
                    marginBottom: `-${rhythm(1/2)}`,
                    width: rhythm(2),
                    height: rhythm(2),
                 }}
                />*/}

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
                 textDecoration: 'none',
                 color: 'inherit',
              }}
              to={'/'}
             >
                MikeZetlow.com
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
             <img src={profile_pic} id="hero_pic"/>
          </Profile_Pic>
          <div
           id="hero_content"
           style={{
              marginLeft: this.state.responsive.hero_content_margin_left,
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
