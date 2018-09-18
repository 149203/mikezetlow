import global from './global_style'
import Typography from 'typography'
import sutro from 'typography-theme-sutro'

sutro.bodyWeight = 400;

delete sutro.googleFonts

sutro.overrideThemeStyles = () => ({
   /*'a.gatsby-resp-image-link': {
      boxShadow: 'none',
   },*/
   'html': {
      backgroundColor: `#fefefe`,
   },
   'a': {
      textDecoration: `none`,
      fontWeight: 400,
   },
   'a:link': {
      color: global.color.blue
   },
   'a:visited': {
      color: global.color.blue,
   },
   'a:hover': {
      textDecoration: `underline`,
   },
   'a:active': {
      textDecoration: `underline`,
   },


})

const typography = new Typography(sutro)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
   typography.injectStyles()
}

export default typography
