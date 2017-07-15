# Hacktiv Overflow

## API Routes

### Auth
| Route | Method | Usage |Result|
| :---: | :---: | :--- | :---|
|/auth/signup | POST | Send url-form with 'fullname', 'username', 'email' and 'password' as attributes | Created user data|
|/auth/signin|POST| Send url-form with 'email' and 'password' as attributes | If sign in success will return token
### Question
| Route | Method | Usage |Result|
| :---: | :---: | :--- | :---|
|/forums/questions|POST|Send token as attribute in headers with user token as value. Send url-form with 'title' and 'content' as attributes | Created question|
### Answer
| Route | Method | Usage |Result|
| :--- | :---: | :--- | :---|
|/forums/questions/:question_id/answer/:|POST|Send token as attribute in headers with user token as value. Send url-form with 'content' as attribute | Posted answer |

### Vote Answer
| Route | Method | Usage |Result|
| :--- | :---: | :--- | :---|
|/forums/questions/:question_id/:answer_id/vote/posvote/| POST | Trigger post | Created vote with positive_vote true |
|/forums/questions/:question_id/:answer_id/vote/negvote| POST | Trigger post | Created vote with negative_vote true |
|/forums/questions/:question_id/:answer_id/vote/unvote| POST | Trigger post | Success message with voter_id,question_id and answer_id |
