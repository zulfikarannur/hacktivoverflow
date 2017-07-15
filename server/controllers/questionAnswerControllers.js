var QuestionAnswer = require('../models').QuestionAnswer
var Question = require('../models').Question
var User = require('../models').User

var postQuestionAnswer = function (req,res) {
  QuestionAnswer.create({
    question_id: req.params.question_id,
    author_id: req.decoded.id,
    content: req.body.content
  })
  .then(function (postResult) {
    res.send(postResult)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var getAllQuestionAnswers = function (req,res) {
  QuestionAnswer.findAll({
    where: {
      question_id: req.params.question_id
    },
    include: [{
      model: Question,
      include: [{
        model: User
      }]
    },{
      model: User
    }]
  })
  .then(function (questionAnswers) {
    res.send(questionAnswers)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

module.exports = {
  postQuestionAnswer,
  getAllQuestionAnswers
};
