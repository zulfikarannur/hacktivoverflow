'use strict';
module.exports = function(sequelize, DataTypes) {
  var AnswerVote = sequelize.define('AnswerVote', {
    question_id: DataTypes.INTEGER,
    answer_id: DataTypes.INTEGER,
    voter_id: DataTypes.INTEGER,
    positive_vote: DataTypes.BOOLEAN,
    negative_vote: DataTypes.BOOLEAN
  });
  AnswerVote.associate = function(models) {
    AnswerVote.belongsTo(models.User, {foreignKey: 'voter_id'})
    AnswerVote.belongsTo(models.Question, {foreignKey: 'voter_id'})
    AnswerVote.belongsTo(models.QuestionAnswer,{foreignKey: 'voter_id'})
  }
  return AnswerVote;
};
