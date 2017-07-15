var router = require('express').Router()
var questionControllers = require('../controllers/questionControllers')
var questionAnswerControllers = require('../controllers/questionAnswerControllers')
var answerVoteControllers = require('../controllers/answerVoteControllers')
var questionVoteControllers = require('../controllers/questionVoteControllers')
var answerCommentControllers = require('../controllers/answerCommentControllers')
var jwtVerify = require('../helpers/jwtVerify')

router.post('/questions', jwtVerify.verifyUser ,questionControllers.postQuestion)
router.get('/questions', questionControllers.getQuestions)

router.post('/questions/:question_id/answer', jwtVerify.verifyUser, questionAnswerControllers.postQuestionAnswer)
router.get('/questions/:question_id/answer', questionAnswerControllers.getAllQuestionAnswers)

router.post('/questions/:question_id/answer/:answer_id/comment', jwtVerify.verifyUser, answerCommentControllers.postAnswerComment)
router.get('/questions/:question_id/answer/:answer_id/comment', jwtVerify.verifyUser, answerCommentControllers.getAnswerComment)

router.post('/questions/:question_id/vote/posvote/', jwtVerify.verifyUser, questionVoteControllers.positiveVote)
router.post('/questions/:question_id/vote/negvote', jwtVerify.verifyUser, questionVoteControllers.negativeVote)
router.delete('/questions/:question_id/vote/unvote',jwtVerify.verifyUser, questionVoteControllers.deleteVote)
router.get('/questions/:question_id/vote/posvote/', questionVoteControllers.getPosVotes)
router.get('/questions/:question_id/vote/negvote', questionVoteControllers.getNegVotes)

router.post('/questions/:question_id/answer/:answer_id/vote/posvote/', jwtVerify.verifyUser, answerVoteControllers.positiveVote)
router.post('/questions/:question_id/answer/:answer_id/vote/negvote', jwtVerify.verifyUser, answerVoteControllers.negativeVote)
router.delete('/questions/:question_id/answer/:answer_id/vote/unvote',jwtVerify.verifyUser, answerVoteControllers.deleteVote)
router.get('/questions/:question_id/answer/:answer_id/vote/posvote/', answerVoteControllers.getPosVotes)
router.get('/questions/:question_id/answer/:answer_id/vote/negvote', answerVoteControllers.getNegVotes)

module.exports = router;
