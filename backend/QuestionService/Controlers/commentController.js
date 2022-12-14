const { exec } = require("../DatabaseHelplers/databaseHelpers");
const jwt_decode = require('jwt-decode');
const uuid = require("uuid");
const moment = require("moment");
require("dotenv").config();

const addComment = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded=jwt_decode(token, { headers: true });
    const user_id=decoded.user_id    
    const comment_id = uuid.v4();
    const comment_created = moment().format();
    const { comment_descprition, answer_id, question_id } = req.body;
    await (
      await exec("insertUpdateComment", {
        user_id,
        question_id,
        comment_id,
        comment_created,
        comment_descprition,
        answer_id,
      })
    ).recordset;

    res.status(201).json({ message: "Comment Inserted to database" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { answer_id } = req.params;
    const comments = await (await exec("getComments", { answer_id })).recordset;
    res.json(comments);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  addComment,
  getComments,
};
