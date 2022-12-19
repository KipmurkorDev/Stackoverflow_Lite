import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAnswers } from "../../Redux/Slices/AnswerSlice";
import {
  searchQuestions,
  getQuestions,
  getmostAsnswers,
} from "../../Redux/Slices/QuestionSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import "./Home.css";
export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState({ search_value: "" });
  const Questions = useSelector((state) => state.question.Questions);
  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);
  const handleInputChange = (e) => {
    setSearch((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handlesearch = () => {
    if (search.search_value) {
      dispatch(searchQuestions(search));
      navigate("/searches");
    } else {
      alert(" nothing to search");
    }
  };
  const getMostAnswer = () => {
    dispatch(getmostAsnswers());
  };
  const handleAnswers = (question_id) => {
    dispatch(getAnswers(question_id));
    navigate("/answers");
  };
  return (
    <div className="conatiner_home">
      <div className="search_btn">
        <input
          id="search"
          type="text"
          name="search_value"
          value={search.search_value}
          onChange={handleInputChange}
          placeholder="search"
        />
        <button onClick={handlesearch}>
          <i class="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
      <div>
        <div className="home-btn">
          <div className="most_question ">All </div>
          <div className="most_answer" onClick={getMostAnswer}>
            <Link to="/most/Answers" className="link_home">
              Most Answered
            </Link>
          </div>
        </div>
        <div className="question">
          {Questions.length === 0 ? (
            <p> There is no questions </p>
          ) : (
            Questions?.map((item) => (
              <div
                className="question-1"
                onClick={() => handleAnswers(item?.question_id)}
              >
                <div>
                  <button>
                    <p>
                      {item?.title}
                      <b>
                        <span>{moment(item?.created).fromNow()}</span>
                      </b>
                    </p>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
