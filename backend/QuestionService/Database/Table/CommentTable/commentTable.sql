CREATE TABLE Comment (
    user_id VARCHAR(100),
    answer_id VARCHAR(100),
    question_id VARCHAR(100),
    comment_id VARCHAR(100),
    comment_descprition VARCHAR(400),
    isDelete BIT DEFAULT '0',
    comment_created VARCHAR(100)
)