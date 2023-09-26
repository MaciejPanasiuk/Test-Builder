## CRUD FOR TESTS AND USERS:

### CREATE

* POST/user/register- create a new user account. ID will be created automaticaly.
  REQUIRED:user info necassary to create an account ( sent in request body)
  example for all the necassary elements:
  ```
  {"isAdmin":false,
      "userName": "newUser",
      "password": "password",
      "supportQuestion": "WHat is 4+4?",
      "supportAnswer": "8"
    }
  ```

  Note that isAdmin flag should be added automaticaly on front-end
* POST/user/:userName/verifyToken - verify the user`s JWT token provided in req headers. Example: for axios:
  ```

  let config = {
    method: 'post',
    maxBodyLength: Infinity,url: 'localhost:4700/user/123/verifyToken',
    headers: { 
      'authorization': 'Bearer YourJVT-access-token', 
      'auth_refresh': 'Bearer YourJVT-refresh-token'
    }
  };
  ```
* POST/user/:username- Get user info. Password (in a header password: password) + userName must be provided.
* POST/user/:username/tests- create a new test and save it to DB. REQUIRED: test JSOn file in request body.Example:
  ```

  {
      "Id": "124234",
      "title":{
          "titleText":"your new Test!",
          "isActive": false
      },
      "questions": [
          {
              "isActive": true,
              "Id": "1",
              "questionText": "Whats the top speed of a swallow?",
              "answers": [
                  {
                      "Id": "11",
                      "answerText": "10/km/h"
                  },
                  {
                      "Id": "12",
                      "answerText": "20/km/h"
                  },
                  {
                      "Id": "13",
                      "answerText": "30/km/h"
                  },
                  {
                      "Id": "14",
                      "answerText": "100km/h"
                  }
              ]
          }
      ]
  }
  ```
* POST/users/:userName/verifyAnswer - for password recovery.Validates the provided recovery question. Returns status 200 if correct,401 if incorrect, 404-if user doesnt exist.

### READ

* GET/users -return all accounts in the DB, only with master password.
  REQUIRED: headers password: masterPassword
* GET/tests -return all tests in the DB, only with master password.
  REQUIRED: headers password: masterPassword
* GET/users/:userName/recovery - returns user`s recovery question.

  REQUIRED: only query string params
* GET/users/:userId/tests - return all tests that are saved on specific user account.

  REQUIRED: only query string params
* GET/users/:username/tests/:testId - return a specific test of specific user. test Id must be provided ( created on frontend )

  REQUIRED: only query string params

### UPDATE

* PATCH/user/:username- modify account information.REQUIRED: password and userName sent as a header: authentication: userName:password. New account info in request body in a JSON form
  ```
  {
      "userName": "newUserName",
      "supportQuestion": "WHat is your favourite color?",
      "supportAnswer": "blue"
    }
  ```
* PATCH/users/:userName/recovery-modify the user`s password specificaly.REQUIRED: new password in request body in a JSON form
  ```
  {
      "password": "12341234"
    }
  ```
* PATCH/user/:username/tests/:testId modify a specific user`s test. REQUIRED: query string params + new updated test in request body:
  ```
  {
      "title":{
          "titleText":"your new title",
          "isActive": false
      },
  }
  ```

### DELETE

* DELETE/user/:username- delete user account and all its tests.REQUIRED:  header: Authorization: userName:password
* DELETE/user/:username/tests/:testId delete a specific test. REQUIRED: only query string params
* DELETE/user/:username/tests delete all users tests REQUIRED: only query string params

## OTHER ENDPOINTS

/heartbeat - current time
