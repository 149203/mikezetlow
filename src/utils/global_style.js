const global = {
   color: {
      // based on https://www.materialui.co/colors
      black: `#000000`,
      gray_darkest: `#1f1f1f`,
      gray_dark: `#505050`,
      gray: `#808080`,
      gray_light: `#b1b1b1`,
      gray_lightest: `#e1e1e1`,
      white: `#ffffff`,
      red: `#f44336`,
      red_dark: `#d32f2f`,
      purple: `#9c27b0`,
      purple_dark: `#7B1FA2`,
      blue: `#2196f3`,
      blue_dark: `#1976D2`,
      green: `#4caf50`,
      green_dark: `#388E3C`,
      yellow: `#ffeb3b`,
      yellow_dark: `#FBC02D`,
      orange: `#ff5722`,
      orange_dark: `#E64A19`,
   },
   screen: {
      xs: `@media (max-width: 479px)`,
      sm: `@media (min-width: 480px) and (max-width: 719px)`,
      md: `@media (min-width: 720px) and (max-width: 959px)`,
      lg: `@media (min-width: 960px) and (max-width: 1199px)`,
      xl: `@media (min-width: 1200px) and (max-width: 1439px)`,
      xxl: `@media (min-width: 1440px)`,
      sm_and_up: `@media (min-width: 480px)`,
      md_and_up: `@media (min-width: 720px)`,
      lg_and_up: `@media (min-width: 960px)`,
      xl_and_up: `@media (min-width: 1200px)`,
      sm_and_down: `@media (max-width: 719px)`,
      md_and_down: `@media (max-width: 959px)`,
      lg_and_down: `@media (max-width: 1199px)`,
      xl_and_down: `@media (max-width: 1439px)`,
   },
}


export default global
