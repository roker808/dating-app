import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {SignInPage} from './components/SignInPage';
import {AppBootstrapper} from './components/AppBootstrapper/AppBootstrapper';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

import './index.scss';
import { PersonPage } from './components/PersonPage/PersonPage';
import { DialogsPage } from './components/DialogsPage/DialogsPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' Component={SignInPage}/>
          <Route path='' Component={AppBootstrapper}>
            <Route path='' element={<Navigate to='people'/>} />
            <Route path='people' Component={PeoplePage}/>
            <Route path='people/:pid' Component={PersonPage}/>
            <Route path='dialogs' Component={DialogsPage}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
