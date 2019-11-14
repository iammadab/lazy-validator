# lazy-validator
Javascript Object Validator

## Installation

```javascript
    npm install lazy-validator --save
```


## Usage

### Import 
```
  const { createValidator } = require("lazy-validator")
```

### Create your validator

```javascript
  const userLoginValidator = createValidator("username.string, password.string")
```

### Use validator

```javascript
  const loginObject = { username: "alice", password: "bob" }
  
  userLoginValidator(loginObject)
    .then(handleSuccess)
    .catch(handleError)
```

If there is an error with the validation, the validator throws an error with an object describing the error

```javascript
  const { createValidator } = require("lazy-validator")
  
  const userLoginValidator = createValidator("username.string, password.string")
  
  //Provoke validation error
  userLoginValidator({ username: 1 })
    .catch(console.log)
 
  //Error format
  {
    error: true,
    errors:[ 
      { 
        error: 'Property not found',
        message: 'Expected property called (password)' 
      },
      { 
        error: 'Type Error',
        message: 'Expected (String) for (username) instead got (number)' 
      },
      { 
        error: 'Type Error',
        message: 'Expected (String) for (password) instead got (undefined)' 
      } 
    ]
   }
```

## Synchronous Validation

```javascript

  const { createValidatorSync } = require("lazy-validator")
  
  const userLoginValidator = createValidatorSync("username.string, password.string")
  
  const validationResult = userLoginValidator({ username: "alice", password: "bob" })
  
  console.log(validationResult) // { error: false, errors: [] }

```

## Types

### String

```
  "field.string"
```

### Number

```
  "field.number"
```

### Boolean

```
  "field.boolean"
```

### Array

```
  "field.array"
```

### Object

```
  "field.object"
```

### Function

```
  "field.function"
```



### Author
[Wisdom Ogwu (iammadab)](https://twitter.com/iammadab)
