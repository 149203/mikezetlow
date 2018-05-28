import global from './global_style'
import Typography from 'typography'
import sutro from 'typography-theme-sutro'

sutro.bodyWeight = 400;

delete sutro.googleFonts

sutro.overrideThemeStyles = () => ({
   /*'a.gatsby-resp-image-link': {
      boxShadow: 'none',
   },*/
   'a': {
      textDecoration: `none`,
      fontWeight: 700,
   },
   'a:link': {
      color: global.color.blue
   },
   'a:visited': {
      color: global.color.purple,
   },
   'a:hover': {
      textDecoration: `underline`,
      filter: `brightness(80%)`
   },
   'a:active': {
      textDecoration: `underline`,
      filter: `brightness(80%)`
   }

})

const typography = new Typography(sutro)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
   typography.injectStyles()
}

export default typography
