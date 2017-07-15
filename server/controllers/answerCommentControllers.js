var AnswerComment = require('../models').AnswerComment
var db = require('../models')

var postAnswerComment = function (req,res) {
  AnswerComment.create({
    question_id: req.params.question_id,
    answer_id: req.params.answer_id,
    author_id: req.decoded.id,
    comment: req.body.comment
  })
  .then(function (AnswerComment) {
    res.send(AnswerComment)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var getAnswerComment = function (req,res) {
  AnswerComment.findAll({
    where:{
      question_id: req.params.question_id,
      answer_id: req.params.answer_id
    },
    include: [
      {
        model:db.Question
      },
      {
        model:db.Answer
      }
    ]
  })
  .then(function (AnswerComment) {
    res.send(AnswerComment)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

module.exports = {
  postAnswerComment,
  getAnswerComment
};
