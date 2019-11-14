const { parseInput } = require("./util")
const createResolver = require("./baseFunctions")

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
		
		return parserResult
	}
}

function applyTransformations(transforms, currentProperty, currentValue, resolver, resultObj){
	for(let i = 0; i < transforms.length; i++){
		let transform = transforms[i], transformFunction = resolver.resolve(transform)

		if(transformFunction.error)
			return resultObj[currentProperty] = transformFunction

		let transformationResult = transformFunction(currentProperty, currentValue)

		if(transformationResult.error)
			return resultObj[currentProperty] = transformationResult

		currentValue = transformationResult.data
	}
	resultObj[currentProperty] = currentValue
}













// let myVal = createValidator("username.string.lowercase, password.string.addSome.lowercase")
// myVal.add("lowercase", function(name, value){
// 	return { error: false, data: value.toLowerCase() }
// })
// myVal.add("addSome", function(name, value){
// 	return { error: false, data: value += "blahBLAH" }
// })
// console.log(myVal.parse({username: "Wisdom", password: "NicEstuff"}))