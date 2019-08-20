const typeMap = {
	"String": String,
	"Number": Number,
	"Boolean": Boolean,
	"Array": Array,
	"Object": Object,
	"Function": Function
}

function createValidator(validationRule){
	let syncValidator = createValidatorSync(validationRule)
	return function (objectToValidate){
		return new Promise(function(resolve, reject){
			let result = syncValidator(objectToValidate)
			resolve(result)
		})
	}
}

function createValidatorSync(validationRule){
	if(removeSpaces(validationRule) == "") return dumbValidator

	return function (objectToValidate){
		let rules = grabRules(removeSpaces(validationRule)), properties = grabProperties(rules), types = grabTypes(rules), errors = []

		types = types.map(capitalizeFirst)

		let propertyErrors = verifyAllProperties(properties, objectToValidate)
		let typeErrors = verifyAllType(properties, types, objectToValidate)

		errors = errors.concat(propertyErrors, typeErrors)
		
		if(errors.length > 0)
			return { error: true, errors: errors }
		else
			return { error: false, errors: errors }
	}
}

function verifyAllProperties(properties, obj){
	let errors = []
	properties.forEach(property => {
		let error = verifyProperty(property, obj)
		errors = errors.concat(error)
	})
	return errors
}

function verifyAllType(properties, types, values){
	let errors = []
	for(let i = 0; i < properties.length; i++){
		let error = verifyType(types[i], properties[i], values[properties[i]])
		errors = errors.concat(error)
	}
	return errors
}

function dumbValidator(objectToValidate){
	return { error: false, errors: [] }
}


module.exports = {
	createValidator: createValidator,
	createValidatorSync: createValidatorSync
}



















//Helpers

function removeSpaces(string){
	return string.replace(/\s/g, "")
}

function grabRules(ruleString){
	return ruleString.split(",")
}

function grabProperties(rules){
	return rules.map(function(rule){
		return rule.split(".")[0]
	})
}

function grabTypes(rules){
	return rules.map(function(rule){
		return rule.split(".")[1]
	})
}

function verifyType(typename, propertyName, value){
	let errors = []
	let typeFn = typeMap[typename]

	if(!typeFn)
		errors.push({ error: "Invalid Type Function", message: `(${typename}) is not a valid type`})

	else if(typename == "Number"){
		if(isNaN(+value) || typeof value == "boolean")
			errors.push({ error: "Type Error", message: `Expected (${typename}) for (${propertyName}) instead got (${typeof value})`})
	}

	else if(typename == "Boolean"){
		let lowCaseValue = ("" + value).toLowerCase(), acceptable = ["true", "false"]
		if(!acceptable.includes(lowCaseValue))
			errors.push({ error: "Type Error", message: `Expected (${typename}) for (${propertyName}) instead got (${typeof value})`})
	}

	else if(typeof typeFn() != typeof value)
		errors.push({ error: "Type Error", message: `Expected (${typename}) for (${propertyName}) instead got (${typeof value})`})

	return errors
}

function verifyProperty(propertyName, obj){
	let errors = []
	if(!obj.hasOwnProperty(propertyName))
		errors.push({ error: "Property not found", message: `Expected property called (${propertyName})`})
	return errors
}

function capitalizeFirst(string){
	lowerCaseValue = string.toLowerCase()
	return lowerCaseValue.charAt(0).toUpperCase() + lowerCaseValue.slice(1)
}