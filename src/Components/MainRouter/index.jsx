import React from 'react';
import ArchivedNotes from '../../Pages/ArchivedNotes';
import Login from '../../Pages/Login';
import MyNotes from '../../Pages/MyNotes';
import Register from '../../Pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ARCHIVEDNOTE_ROUTE, LOGIN_ROUTE, MYNOTES_ROUTE, REGISTER_ROUTE } from '../../Constants';

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN_ROUTE} element={<Login />} />
        <Route path={REGISTER_ROUTE} element={<Register />} />
        <Route path={MYNOTES_ROUTE} element={<MyNotes />} />
        <Route path={ARCHIVEDNOTE_ROUTE} element={<ArchivedNotes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
