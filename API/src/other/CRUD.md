## CRUD FOR TESTS AND USERS:

CREATE

* POST/user/register- create a new user account. ID will be created automaticaly.
* POST/user/:userName/verifyToken - verify the user`s JWT token provided in req headers as authorization: Bearer JWTtoken-to-verify
* POST/user/:username- Get user info.Password (in a header password: password) + userName must be provided.
* POST/user/:username/tests- create a new test and save it to DB.Must have at least 1 question and 2 answers to it!
* POST/users/:userName/verifyAnswer - for password recovery.Validates the provided recovery question. Returns status 200 if correct,401 if incorrect, 404-if user doesnt exist.

READ

* GET/users -return all accounts in the DB, only with master password
* GET/tests -return all tests in the DB, only with master password
* GET/users/:userName/recovery - returns user`s recovery question
* GET/users/:userId/tests - return all tests that are saved on specific user account.
* GET/users/:username/tests/:id - return a specific test of specific user. test Id must be provided ( created on frontend )

UPDATE

* PATCH/user/:username- modify account information.REQUIRED: password and userName sent as a header: authentication: userName:password
* PATCH/users/:userName/recovery-modify the user`s password specificaly
* PATCH/user/:username/tests/:id modify a specific user`s test.

DELETE

* DELETE/user/:username- delete user account and all its tests.REQUIRED: password and userName sent as a header: Authorization: userName:password
* DELETE/user/:username/tests/:id delete a specific test
* DELETE/user/:username/tests delete all users tests

## OTHER ENDPOINTS

/heartbeat - current time
