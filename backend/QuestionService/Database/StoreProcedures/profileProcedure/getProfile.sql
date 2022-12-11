CREATE  or Alter PROCEDURE getProfile(
    @user_id VARCHAR(100)
)
  AS
  BEGIN
  SELECT Users.user_name, Users.email, Users.Name FROM Users WHERE Users.user_id=@user_id and isDelete='0'
  SELECT Question.title, Question.question_id FROM Question WHERE Question.user_id=@user_id and isDelete='0'
  SELECT Answer.answer_descprition, Answer.answer_id FROM Answer WHERE Answer.user_id=@user_id and isDelete='0'
  SELECT Comment.comment_id, Comment.comment_descprition  FROM Comment WHERE Comment.user_id=@user_id and isDelete='0'
END