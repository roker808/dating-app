import React from 'react';
import { authService } from '../../services/AuthService';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { signInActions } from '../../redux/signin/signInSlice';

interface ISignInPageProps {
  loading?: boolean;
  formInvalid?: boolean;
}

export const SignInPage: React.FC<ISignInPageProps> = (props) => {
  if (authService.isAuthenticated) {
    return <Navigate to="/app" />
  }

  const { loading, userName, password, errorMessage } = useAppSelector(state => state.signIn);

  const dispatch = useAppDispatch();

  const navigator = useNavigate();

  const loadingCb: () => void = () => dispatch(signInActions.signIn([userName, password, navigator]));

  const uNameChangedCb: (evt: React.ChangeEvent<HTMLInputElement>) => void = evt => dispatch(signInActions.setUserName(evt.target.value));

  const pwdChangedCb: (evt: React.ChangeEvent<HTMLInputElement>) => void = evt => dispatch(signInActions.setPassword(evt.target.value));

  if (loading) {
    return <h1>Loading</h1>
  }

  return (
    <div className="login-page">
      <h1>Login</h1>
      <div className="form login-form">
        { errorMessage && <div className='error-msg'>{errorMessage}</div> }
        <div className="form-control">
          <input type="text" value={userName} onChange={uNameChangedCb} />
        </div>
        <div className="form-control">
          <input type="password" value={password} onChange={pwdChangedCb} />
        </div>
        <div className="form-control">
          <button type='button' disabled={!!errorMessage} onClick={loadingCb}>Sign In</button>
        </div>
      </div>
    </div>
  );
};