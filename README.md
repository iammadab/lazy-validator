# Lazy Validator
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
    const validLoginObject = { username: "UsErOne", passsword: "nice" }
    const invalidLoginObject = { username: 1, password: {} }
```

#### Apply the validator
```javascript
    const validationResult1 = userLoginValidator.parse(validLoginObject)
    const validationResult2 = userLoginValidator.parse(invalidLoginObject)

    console.log(validationResult1)
    // Result
    { 
        error: false, 
        data: { 
            username: 'UsErOne', 
            password: 'nice' 
        } 
    }

    console.log(validationResult2)
    // Result
    {
      error: true,
      errors: [
        'Expected (string) for (username) instead got (number)',
        'Expected property called (password)'
      ]
    }
```



### Type Validation + Transformation
#### Now if you wanted to transform the username to lowercase after you have validated that it is a string.

### Create your validator
```javascript
    const userLoginValidator = createValidator("username.string.lowercase, password.string")
```

### Define what your transformation does
#### Note: In the future, predefined transformation for common usecases will be available

``` javascript
    userLoginValidator.add("lowercase", value => value.toLowerCase())
```

#### Get your object
```javascript
    const validLoginObject = { username: "UsErOne", passsword: "nice" }
    const invalidLoginObject = { username: 1, password: {} }
```