const { parseInput } = require("./util")
const createResolver = require("./baseFunctions")

let resolver = createResolver()
console.log(resolver)

console.log(resolver.resolve("number")("5035"))
console.log(resolver.resolve("email"))
resolver.add("email", val => val.indexOf("@") > 0)
console.log(resolver.resolve("email"))

function createValidator(validationString){

	let instructionObj = parseInput(validationString)
	console.log(instructionObj)

	function parse(objToValidate){
		let instructionProps = Object.keys(instructionObj)
		console.log(instructionProps)
		let parserResult = {}
		instructionProps.forEach(instructionProp => {

		})
	}

	return {
		parse
	}

}

// let myVal = createValidator("username.string, password.string")
// myVal.parse({})