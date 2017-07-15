'use strict';
module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('Question', {
    author_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    desc: DataTypes.TEXT
  });
  Question.associate = function(models) {
    Question.belongsTo(models.User, {foreignKey: 'author_id'})
    Question.hasMany(models.QuestionAnswer, {foreignKey: 'question_id'})
    Question.hasMany(models.QuestionVote, {foreignKey:'question_id'})
  }
  return Question;
};
