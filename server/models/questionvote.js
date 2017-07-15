'use strict';
module.exports = function(sequelize, DataTypes) {
  var QuestionVote = sequelize.define('QuestionVote', {
    question_id: DataTypes.INTEGER,
    voter_id: DataTypes.INTEGER,
    positive_vote: DataTypes.BOOLEAN,
    negative_vote: DataTypes.BOOLEAN
  });
  QuestionVote.associate = function(models) {
    QuestionVote.belongsTo(models.User, {foreignKey: 'voter_id'})
    QuestionVote.belongsTo(models.Question, {foreignKey: 'question_id'})
  }
  return QuestionVote;
};
