CREATE or ALTER PROCEDURE insertUpdateComment(
    @user_id VARCHAR(200),
    @question_id VARCHAR(100),
    @answer_id VARCHAR(100),
    @comment_id VARCHAR(100),
    @comment_descprition VARCHAR(400),
    @comment_created VARCHAR(100)
    )
AS
BEGIN
    IF EXISTS(
    SELECT*
    FROM Comment
    WHERE answer_id = @answer_id AND comment_id=@comment_id) 
    BEGIN
        UPDATE Comment
         SET comment_descprition=@comment_descprition
         WHERE answer_id = @answer_id
    END
ELSE BEGIN
        INSERT INTO Comment
            (user_id, answer_id,question_id, comment_id, comment_descprition, comment_created)
        VALUES
            (@user_id, @answer_id,@question_id, @comment_id, @comment_descprition, @comment_created)
    END
END
