var Question = require('../models').Question
var User = require('../models').User

var postQuestion = function (req,res) {
  Question.create({
    author_id: req.decoded.id,
    title: req.body.title,
    desc: req.body.desc
  })
  .then(function (resultQuestion) {
    res.send(resultQuestion)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var getQuestions = function (req,res) {
  Question.findAll({
    include: [{
        model:User
    }]
  })
  .then(function (Questions) {
    res.send(Questions)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var getQuestion = function (req,res) {
  Question.findOne({
    where: {
      id: req.params.question_id
    },
    include: [{
        model:User
    }]
  })
  .then(function (Question) {
    res.send(Question)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

module.exports = {
  postQuestion,
  getQuestions
};
