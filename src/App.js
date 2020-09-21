import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import ParentOnlyRoute from './routes/ParentOnlyRoute';
import Landing from './components/Landing/Landing';
import ParentLogin from './components/ParentLogin/ParentLogin';
import RegistrationRoute from './routes/RegistrationRoute/RegistrationRoute';
import ParentDashRoute from './routes/ParentDashRoute/ParentDashRoute';
import MemberOnlyRoute from './routes/MemberOnlyRoute';
import NavBar from './components/Header/Header';
import HouseholdPage from './routes/HouseholdPage/HouseholdPage';
import MemberDashRoute from './routes/MemberDashRoute/MemberDashRoute';
import MemberLogin from './components/MemberLogin/MemberLogin';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Loading from './components/Loading/Loading';
import './normalize.css';
import './App.css';

function App() {
  console.log(process.env.YEET);
  return (
    <div className="App">
      <NavBar />
      <main>
        <Switch>
          <PublicRoute exact path={'/'} component={Landing} />
          <PublicRoute exact path={'/login'} component={ParentLogin} />
          <PublicRoute exact path={'/kidLogin'} component={MemberLogin} />
          <PublicRoute exact path={'/register'} component={RegistrationRoute} />
          <ParentOnlyRoute
            exact
            path={'/parent-dashboard'}
            component={ParentDashRoute}
          />
          <MemberOnlyRoute
            exact
            path={'/member-dashboard'}
            component={MemberDashRoute}
          />
          <PrivateRoute
            exact
            path={'/household/:id'}
            component={HouseholdPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
