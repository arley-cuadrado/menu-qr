import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginView from './routes/loginView';
import DashboardView from './routes/dashboardView';
import EditProfileView from './routes/editProfileView';
import SignOutView from './routes/signOutView';
import PublicProfileView from './routes/publicProfileView';
import ChooseUsernameView from './routes/chooseUsernameView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='login' element={<LoginView />}></Route>
      <Route path='dashboard' element={<DashboardView />}></Route>
      <Route path='dashboard/profile' element={<EditProfileView />}></Route>
      <Route path='signout' element={<SignOutView />}></Route>
      <Route path='u/:username' element={<PublicProfileView />}></Route>
      <Route path='choose-username' element={<ChooseUsernameView />}></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
