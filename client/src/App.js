import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header'; 
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import NotFound from './components/NotFound';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <UserRoute exact path="/user/dashboard" component={UserDashboard} />
          <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
