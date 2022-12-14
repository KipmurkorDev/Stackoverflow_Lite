const moment = require("moment");
const { exec } = require("../DatabaseHelplers/databaseHelpers");
const jwt_decode = require('jwt-decode');
const uuid = require("uuid");
require("dotenv").config();

const addQuestion = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded=jwt_decode(token); 
    const question_id = uuid.v4();
    const user_id=decoded.user_id
    const created = moment().format();
    const { title, description } = req.body;
    await (
      await exec("insertUpdateQuestion", {
        user_id,
        question_id,
        title,
        description,
        created,
      })
    ).recordset;

    res.status(201).json({ message: "Question Inserted to database" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getQuestions = async (req, res) => {
  try {
    const {PageNumber}=req.params
    const questions = await (await exec("getQuestions", {PageNumber})).recordsets;
    res.json(questions);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const searchQuestions = async (req, res) => {
  try {
    const { search_value } = req.body;
    const searches = await (
      await exec("getsearchQuestions", { search_value })
    ).recordset;
    res.json(searches);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const mostAnswerdQuestion = async (req, res) => {
  try {
    const {PageNumber}=req.params
    const response = await exec("mostAnswerQuestion", {PageNumber});
    const questions = await response.recordsets;
    res.json(questions);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = {
  addQuestion,
  getQuestions,
  searchQuestions,
  mostAnswerdQuestion,
};
