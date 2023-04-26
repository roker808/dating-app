import React from "react";
import { Page } from "../Page/Page";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { personActions } from "../../redux/person/personSlice";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "../Spinner";
import { defThumb } from "../../constants";

import './PersonPage.scss';

interface IPersonPageProps {
}

export const PersonPage: React.FC<IPersonPageProps> = () => {

  const { pid } = useParams();
  const dispatch = useAppDispatch();

  let {profile, loadingProfile, myProfile} = useAppSelector(state => ({ ...state.person, myProfile: state.app.profile }));

  const me = pid === 'me';
  profile = me ? myProfile : profile;
  
  const init = () => dispatch(personActions.fetchProfile(pid!));

  return (
    <Page title={(me ? 'Me: ' : '') + (profile?.name || 'Person')} className="person-page" onMount={init}>
      { loadingProfile && <Spinner/> }
      {
        profile && (
          <div className="profile container">
            <div className="row">
              <div className="col-4">
                <img src={profile.thumbnailUri ?? defThumb} className="img-thumbnail" />
              </div>
              <div className="col-8">
                <div className="name-age">
                  {/* <span className="name">{profile.name}</span> */}
                  <strong className="age"> {profile.age} years old</strong>
                </div>
                <div className="about">{profile.about}</div>
              </div>
            </div>
            {
              me ? undefined : (
                <div className="row">
                  <div className="col-4">
                    <Link to={`/dialogs/${profile.id}`} className="btn btn-primary msg-btn">Send message</Link>
                  </div>
                </div>
              )
            }
          </div>
        ) 
      }
    </Page>
  );
};