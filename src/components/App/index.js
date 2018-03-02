import { withState, compose } from 'recompose';

import sections from '../../stubs/sections';
import App from './App';
import withLocalStorage from '../../hocs/withLocalStorage';

export default compose(
  withState('sections', 'setSections', sections),
  withLocalStorage([['sections', 'setSections']])
)(App);
