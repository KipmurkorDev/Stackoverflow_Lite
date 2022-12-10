import React from "react";
import Profile from "./Profile";
import { useSelector } from "react-redux";
export default function UserAnswer() {
const user = useSelector((state) => state.profile.Profile);
const loading = useSelector((state) => state.profile.isLoading);

console.log(user);

if (!loading) return <>Loading</>;
  return (
    <div className="container-profile">
      <div className="user-profile-6">
        <Profile />
      </div>
      <div className="answers">
        <div className="answe-0">
          {user[2]?.map((item) => (
            <div className="user-answer">
              <div className="usercontent"> {item.answer_descprition}</div>
              <div className="editbtn">
                <div className="btn_user">
                  <i class="fas fa-edit"></i>
                </div>
                <div className="btn_user">
                <i class="fa fa-trash" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
