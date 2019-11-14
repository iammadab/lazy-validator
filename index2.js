const { parseInput } = require("./util")
const createResolver = require("./baseFunctions")

function createValidator(validationString){

	let instructionObj = parseInput(validationString)
	console.log(instructionObj)

	let resolver = createResolver()

	function parse(objToValidate){
		let instructionProps = Object.keys(instructionObj)
		console.log(instructionProps)
		let parserResult = {}
		instructionProps.forEach(instructionProp => {
			let exists = resolver.resolve("hasproperty")(objToValidate, instructionProp)
			if(exists.error)
				return parserResult[instructionProp] = exists

			let transforms = instructionObj[instructionProp], currentValue = objToValidate[instructionProp]	
			for(let i = 0; i < transforms.length; i++){
				let transformationResult = transforms[i](instructionProp, currentValue)
				if(transformationResult.error)
					return parserResult[instructionProp] = transformationResult
				currentValue = transformationResult.data
			}
			
		})
		console.log(parserResult)
	}

	return {
		parse,
		add: resolver.add
	}

}

let myVal = createValidator("username.strings, password.string")
myVal.parse({username: 1, password: 2})