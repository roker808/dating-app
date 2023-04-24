import React from 'react';
import {authService} from '../../services/AuthService';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import './AppBootstrapper.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { appActions } from '../../redux/app/appSlice';

interface IAppBootstrapperProps {
  val?: string;
}

export const AppBootstrapper: React.FC<IAppBootstrapperProps> = () => {
  if (!authService.isAuthenticated) {
    return <Navigate to="/signin" />
  }

  const profile = useAppSelector(x => x.app.profile);

  const dispatch = useAppDispatch();

  const navigator = useNavigate();

  const signOut = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(appActions.signOut(navigator))
  };

  return (
    <div className="app container">
      <div className="row">
        <div className="app-nav col">
          {
            profile && (
              <>
                <div className="my-profile-card">
                  <div className="img-wrap">
                    {profile?.thumbnailUri && <img className='img-fluid thumb' src={profile.thumbnailUri} />}
                  </div>
                  <div className="name-age"><span className="name">{profile.name}</span> <span className="age">{profile.age} y.o.</span></div>
                </div>
                
              </>
            )
          }
          
          <ul>
            <li><Link to='/people/me'>Profile</Link></li>
            <li><Link to='/people'>People</Link></li>
            <li><Link to='/dialogs'>Messages</Link></li>
            <li><a href='/signout' onClick={signOut}>Sing Out</a></li>
          </ul>
        </div>
        <div className="content col">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};