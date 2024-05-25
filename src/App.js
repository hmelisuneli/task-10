import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import './App.css';

const LazyAdvertismentForm = React.lazy(() => import('./components/advertismentForm'));
const LazyAdvertismentList = React.lazy(() => import('./components/advertismentList'));

const App = () => {
  return (
    <Provider store={store}>
      <div>

        <Suspense fallback={<div>Loading form...</div>}>
          <LazyAdvertismentForm />
        </Suspense>
        <Suspense fallback={<div>Loading list...</div>}>
          <LazyAdvertismentList />
        </Suspense>
      </div>
    </Provider>
  );
};

export default App;
