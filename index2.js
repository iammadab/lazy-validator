const { parseInput } = require("./util")

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

let myVal = createValidator("username.string, password.string")
myVal.parse({})