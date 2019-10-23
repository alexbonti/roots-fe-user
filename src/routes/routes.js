/***
 *  Created by Sanchit Dang
 ***/
import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginContext } from 'contexts';
import {
  Login,
  Home,
  Profile,
  ChangePassword,
  ForgotPassword,
  MobileMenu,
  Intro,
  ModuleDetailedView,
  Modules,
  ModulesList,
  FavouriteMenu,
  FourOFour,
  Timetable,
  ProfileSettings,
  ProfileChangePassword,
  EditProfile,
  Notification,
  NotificationSettings,
} from 'views';
import { Layout } from '../layout';
import { LayoutConfig } from 'configurations';

export const AppRoutes = (props) => {
  const { loginStatus } = useContext(LoginContext);
  let landingPage = (LayoutConfig.landingPage !== undefined ?
    LayoutConfig.landingPage !== '' ? LayoutConfig.landingPage : '/home'
    : '/home');

  return (
    <Switch>

      <Route exact path='/' render={() => (!loginStatus ? <Redirect to={{ pathname: '/login' }} {...props} /> : <Redirect to={{ pathname: landingPage }} {...props} />)} />

      <Route exact path='/login' render={() => (!loginStatus ? <Login {...props} /> : <Redirect to={{ pathname: landingPage }} {...props} />)} />

      <Route exact path='/intro' render={() => (!loginStatus ? <Redirect to={{ pathname: landingPage }} {...props} /> : <Intro {...props} />)} />

      <Route exact path='/change-password' render={() => <ChangePassword {...props} />} />

      <Route exact path='/forgot-password' render={() => (<ForgotPassword {...props} />)} />

      {/* <Route exact path='/register' render={() => ((!redirectToLogin ? <Redirect to={{ pathname: '/register' }} /> : <Register />))} /> */}

      <Route exact path='/login' render={() => (!loginStatus ? <Redirect to={{ pathname: landingPage }} {...props} /> : <Layout><Login  {...props} /></Layout>)} />

      <Route exact path='/home' render={() => (!loginStatus ? <Redirect to={{ pathname: '/login' }} {...props} /> : <Layout><Home {...props} /></Layout>)} />

      <Route exact path='/notifications' render={() => (!loginStatus ? <Redirect to={{ pathname: '/login' }} {...props} /> : <Layout><Notification {...props} /></Layout>)} />

      <Route exact path='/notifications/settings' render={() => (!loginStatus ? <Redirect to={{ pathname: '/login' }} {...props} /> : <Layout><NotificationSettings {...props} /></Layout>)} />

      <Route exact path='/modules' render={() => (!loginStatus ? <Redirect to={{ pathname: '/login' }} {...props} /> : <Layout><Modules {...props} /></Layout>)} />

      <Route exact path='/module/:m_id' render={() => (!loginStatus ? <Redirect to={{ pathname: '/login' }} {...props} /> : <Layout><ModuleDetailedView {...props} /></Layout>)} />

      <Route exact path='/module/:m_id/timetable' render={() => (!loginStatus ? <Redirect to={{ pathname: '/login' }} {...props} /> : <Layout><Timetable {...props} /></Layout>)} />

      <Route exact path={['/favourites/modules', '/favourites/activities']} render={() => (!loginStatus ? <Redirect to={{ pathname: '/login' }} {...props} /> : <Layout><ModulesList {...props} /></Layout>)} />

      <Route exact path='/menu' render={() => (!loginStatus ? <Redirect to={{ pathname: '/login' }}  {...props} /> : <Layout><MobileMenu  {...props} /></Layout>)} />

      <Route exact path='/favourites' render={() => (!loginStatus ? <Redirect to={{ pathname: '/login' }}  {...props} /> : <Layout><FavouriteMenu  {...props} /></Layout>)} />

      <Route exact path='/profile' render={() => (!loginStatus ? <Redirect to={{ pathname: '/login' }} /> : <Layout><Profile /></Layout>)} />

      <Route exact path='/profile/edit' render={() => (!loginStatus ? <Redirect to={{ pathname: '/login' }} /> : <Layout><EditProfile /></Layout>)} />

      <Route exact path='/profile/settings' render={() => (!loginStatus ? <Redirect to={{ pathname: '/login' }} /> : <Layout><ProfileSettings /></Layout>)} />

      <Route exact path='/profile/settings/change-password' render={() => (!loginStatus ? <Redirect to={{ pathname: '/login' }} /> : <Layout><ProfileChangePassword /></Layout>)} />

      <Route render={() => (!loginStatus ? <Redirect to={{ pathname: '/login' }}  {...props} /> : <Layout><FourOFour /></Layout>)} />

    </Switch>
  );
};

/**
 * Changelog 26/09/2019 - Sanchit Dang
 * - use loginStatus variable instead of stateVariable
 * - <Layout/> has to be used alongside every inner view
 * - removed use of trigger404 function
 */
