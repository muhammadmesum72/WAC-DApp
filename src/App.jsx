import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';

// ----------------------------------------------------------------------

export default function App() {
  // return          <Router />



   return (
      <ThemeConfig>
         {/* <ScrollToTop /> */}

        <GlobalStyles />

         <Router />
      </ThemeConfig>
   );
}
