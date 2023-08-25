## CRUD FOR TESTS AND USERS:

CREATE

* POST/user/register- create a new user account. ID will be created automaticaly.
* POST/user/createToken
* POST/user/:username/tests/:id- create a new test and save it to DB.Must have at least 1 question and 2 answers to it!

READ

* GET/Auth
* GET/users -return all accounts in the DB, only with master password
* GET/tests -return all tests in the DB, only with master password
* GET/users/:userId - return user`s information
* GET/users/:userId/tests - return all tests that are saved on specific user account.Account name and password required in request headers!  ( "authorization": "username:password")
* GET/users/:username/tests/:id - return a specific test of specific user. authentication will be checked after all tests will be requested

UPDATE

* PATCH/user/:username/tests/:id modify a specific user`s test.
* PATCH/user/:username- modify account information.Password reset will be done through a support question.

DELETE

* DELETE/user/:username- delete user account and all its tests
* DELETE/user/:username/tests/:id delete a specific test
* DELETE/user/:username/tests delete all users tests

## OTHER ENDPOINTS

/heartbeat - current time
