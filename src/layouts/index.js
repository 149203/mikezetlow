import React from 'react'
import Link from 'gatsby-link'

import { rhythm, scale } from '../utils/typography'
import profile_pic from './mike_zetlow_profile_picture.jpg'

class Template extends React.Component {

   render() {
      const { location, children } = this.props
      let header
      let profile_pic_opacity = `1`

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
                Hi, I'm Mike Zetlow.
             </Link>
          </h1>
         )
      }
      else {
         profile_pic_opacity = `0.3`
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
      return (
       <div>
          <img src={profile_pic}
               style={{
                  position: `fixed`,
                  right: 0,
                  maxHeight: `100vh`,
                  opacity: profile_pic_opacity,
               }}
          />
          <div
           style={{
              marginLeft: 'auto',
              marginRight: 'auto',
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
