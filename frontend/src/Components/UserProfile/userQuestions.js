import React from "react";
import Profile from "./Profile";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuestion } from "../Redux/Slices/userSliceProfile";
export default function UserQuestions() {
  const dispatch=useDispatch()
  const user = useSelector((state) => state.profile.Profile);
  const loading = useSelector((state) => state.profile.isLoading);
  const deletequestion=(data)=>{
  dispatch(deleteQuestion(data))
  }
  if (!loading) return <>Loading</>;

  return (
    <div className="container-profile">
      <div className="user-profile-6">
        <Profile />
      </div>
      <div className="answers">
        <div className="answe-0">
          {user[1]?.map((item) => (
            <div className="user-answer">
              <div className="usercontent"> {item?.title}</div>
              <div className="editbtn">
                <div className="btn_user">
                  <i class="fas fa-edit"></i>
                </div>
                <div className="btn_user" onClick={()=>deletequestion({...item, answer_id:user[2][0]?.answer_id})}>
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
