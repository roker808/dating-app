import React from "react";
import { IProfile } from "../../services/Profile"
import { Link } from "react-router-dom";
import { defThumb } from "../../constants";

interface IProfileCardProps {
  profile: IProfile;
}

export const ProfileCard: React.FC<IProfileCardProps> = ({ profile }) => {
  return (
      <div className="card mb-3" >
        <div className="row g-0">
          <div className="col-md-4">
            <Link to={`/people/${profile.id}`}><img src={profile.thumbnailUri ?? defThumb} className="img-fluid rounded-start" alt="..."/></Link>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{profile.name}</h5>
              <p className="card-text">{profile.about}</p>
              <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>
    
  );
};