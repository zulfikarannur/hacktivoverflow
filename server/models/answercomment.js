'use strict';
module.exports = function(sequelize, DataTypes) {
  var AnswerComment = sequelize.define('AnswerComment', {
    question_id: DataTypes.INTEGER,
    answer_id: DataTypes.INTEGER,
    author_id: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  });
  AnswerComment.associate = function(models) {
    AnswerComment.belongsTo(models.User, {foreignKey: 'author_id'})
    AnswerComment.belongsTo(models.QuestionAnswer,{foreignKey: 'answer_id'})
    AnswerComment.belongsTo(models.Question, {foreignKey: 'question_id'})
  }
  return AnswerComment;
};
