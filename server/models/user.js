'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING
  })
  User.associate = function(models) {
    User.hasMany(models.Question, {foreignKey: 'author_id'})
    User.hasMany(models.QuestionAnswer, {foreignKey: 'author_id'})
    User.hasMany(models.AnswerVote, {foreignKey: 'voter_id'})
    User.hasMany(models.QuestionVote, {foreignKey: 'voter_id'})
    User.hasMany(models.AnswerComment, {foreignKey: 'author_id'})
  }
  return User;
};
