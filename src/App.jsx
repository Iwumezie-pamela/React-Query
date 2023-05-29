import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Home from './components/Home.Page';
import SuperHeroes from './components/SuperHeroes.Page';
import RQSuperHeroes from './components/RQSuperHeroes.Page';
import RQSuperHero from './components/RQSuperHero';
import ParallelQueries from './components/ParallelQueries';
import DynamicParallelQuery from './components/DynamicParallelQuery';
import DependentQueries from './components/DependentQueries';
import { PaginatedQueriesPage } from './components/PaginatedQueries';
import InfiniteQuery from './components/InfiniteQuery';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/super-heroes' element={<SuperHeroes />} />
            <Route path='/rq-super-heroes' element={<RQSuperHeroes />} />
            <Route path='/rq-super-heroes/:id' element={<RQSuperHero />} />
            <Route path='/rq-parallel' element={<ParallelQueries />} />
            <Route
              path='/rq-dynamic-parallel'
              element={<DynamicParallelQuery ids={[1, 2, 3, 4]} />}
            />
            <Route
              path='/rq-dependent'
              element={<DependentQueries email='iwumeziep@gmail.com' />}
            />
            <Route path='/rq-pagination' element={<PaginatedQueriesPage />} />
            <Route path='/rq-infinite' element={<InfiniteQuery />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;
