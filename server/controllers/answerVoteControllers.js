var AnswerVote = require('../models').AnswerVote
var db = require('../models')

var positiveVote = function (req,res) {
  AnswerVote.create({
    question_id: req.params.question_id,
    answer_id: req.params.answer_id,
    voter_id: req.decoded.id,
    positive_vote: true,
    negative_vote: false
  })
  .then(function (voteResult) {
    res.send(voteResult)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var negativeVote = function (req,res) {
  AnswerVote.create({
    question_id: req.params.question_id,
    answer_id: req.params.answer_id,
    voter_id: req.decoded.id,
    positive_vote: false,
    negative_vote: true
  })
  .then(function (voteResult) {
    res.send(voteResult)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var deleteVote = function (req,res) {
  AnswerVote.findOne({
    where: {
      question_id: req.params.question_id,
      answer_id: req.params.answer_id,
      voter_id: req.decoded.id
    }
  })
  .then(function (findVote) {
    if (!findVote) {
      res.send({msg: `Vote with voter_id ${req.decoded.id} , answer_id ${req.params.answer_id} and question_id ${req.params.question_id} not found`})
    } else {
      findVote.destroy()
      .then(function () {
        res.send({msg: `Vote with voter_id ${req.decoded.id} , answer_id ${req.params.answer_id} and question_id ${req.params.question_id} deleted`})
      })
      .catch(function (err) {
        res.status(500).send(err)
      })
    }
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var getPosVotes = function (req,res) {
  console.log("Test Masuk Get Pos Votes");
  AnswerVote.findAndCountAll({
    where: {
      question_id: req.params.question_id,
      answer_id: req.params.answer_id,
      positive_vote: true
    }
  })
  .then(function (resultPosVotes) {
    res.send(resultPosVotes.count.toString())
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var getNegVotes = function (req,res) {
  AnswerVote.findAndCountAll({
    where: {
      question_id: req.params.question_id,
      answer_id: req.params.answer_id,
      negative_vote : true
    }
  })
  .then(function (resultPosVotes) {
    res.send(resultPosVotes.count.toString())
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}
module.exports = {
  positiveVote,
  negativeVote,
  deleteVote,
  getPosVotes,
  getNegVotes
};
