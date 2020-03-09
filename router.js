import Home from './src/Home';
import Grid from './src/Grid'
import fetchPopularRepos from './src/api';

const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/grid',
    exact: true,
    component: Grid,
    fetchData: fetchPopularRepos
  }
]

export default routes;