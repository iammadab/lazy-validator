#Lazy Validator
Validate your javascript object, and transform their values.
Sometimes, you don't just want to validate an object, but you want to transform the object values in some way e.g to uppercase, lower case, remove all r's e.t.c before working with it.

## Installation
``` javascript
    npm install lazy-validator
```

## Usage

### Import
``` javascript
    const { createValidator } = require("lazy-validator")
```

### Type Validation
#### Create your validator
```javascript
    const userLoginValidator = createValidator("username.string, password.string")
```

#### Get your object(s)
```javascript
    const validLoginObject = { username: "hello", passsword: "nice" }
    const invalidLoginObject = { username: 1, password: "nice" }
```

#### Apply the validator
```javascript
    const validationResult1 = userLoginValidator.parse(validLoginObject)
    const validationResult2 = userLoginValidator.parse(invalidLoginObject)

    console.log(validationResult1)
    
```