const { parseInput } = require("./lib/util")
const createResolver = require("./lib/baseFunctions")

function createValidator(validationString){
	let instructionObj = parseInput(validationString)
	let resolver = createResolver()

	let parser = createParser(instructionObj, resolver)

	return {
		parse: parser,
		add: resolver.add
	}
}

function createParser(instructionObj, resolver){
	return function parse(objToValidate){
		let instructionProps = Object.keys(instructionObj), parserResult = {}

		instructionProps.forEach(currentProperty => {
			let exists = resolver.resolve("hasproperty")(objToValidate, currentProperty)
			if(exists.error)
				return parserResult[currentProperty] = exists

			let transforms = instructionObj[currentProperty], currentValue = objToValidate[currentProperty]	

			applyTransformations(transforms, currentProperty, currentValue, resolver, parserResult)
		})
		
		return formatResult(parserResult)
	}
}

function applyTransformations(transforms, currentProperty, currentValue, resolver, resultObj){
	for(let i = 0; i < transforms.length; i++){
		let transform = transforms[i], transformFunction = resolver.resolve(transform)

		if(transformFunction.error)
			return resultObj[currentProperty] = transformFunction

		let transformationResult = transformFunction(currentValue, currentProperty)

		if(transformationResult.error)
			return resultObj[currentProperty] = transformationResult

		currentValue = transformationResult
	}
	resultObj[currentProperty] = currentValue
}

function formatResult(parseResult){
	console.log(parseResult)
	let errors = [], props = Object.keys(parseResult)
	props.forEach(prop => {
		if(parseResult[prop].error)
			errors.push(parseResult[prop].error_string)
	})
	if(errors.length > 0)
		return { error: true, errors }
	else
		return { error: false, data: parseResult }
}


module.exports = { createValidator }








const userLoginValidator = createValidator("username.string.lowercase, password.string")
const validLoginObject = { username: "hello", password: "nice" }
const invalidLoginObject = { username: 1 }

userLoginValidator.add("lowercase", val => val.toLowerCase())

const validationResult1 = userLoginValidator.parse(validLoginObject)
const validationResult2 = userLoginValidator.parse(invalidLoginObject)

console.log(validationResult1)
console.log(validationResult2)
// let myVal = createValidator("username.string.lowercase, password.string.addSome.lowercase")
// myVal.add("lowercase", function(value){
// 	return { error: false, data: value.toLowerCase() }
// })
// myVal.add("addSome", function(value){
// 	return { error: false, data: value += "blahBLAH" }
// })
// console.log(myVal.parse({username: "Wisdom", password: "NicEstuff"}))