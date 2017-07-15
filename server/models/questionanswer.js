'use strict';
module.exports = function(sequelize, DataTypes) {
  var QuestionAnswer = sequelize.define('QuestionAnswer', {
    question_id: DataTypes.INTEGER,
    author_id: DataTypes.INTEGER,
    content: DataTypes.TEXT
  });
  QuestionAnswer.associate = function(models) {
    QuestionAnswer.belongsTo(models.Question,{foreignKey: 'question_id'})
    QuestionAnswer.belongsTo(models.User,{foreignKey: 'author_id'})
    QuestionAnswer.hasMany(models.AnswerVote, {foreignKey: 'answer_id'})
    QuestionAnswer.hasMany(models.AnswerComment, {foreignKey: 'answer_id'})
  }
  return QuestionAnswer;
};
