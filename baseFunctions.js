module.exports = {
	createResolver
}

function createResolver(){
	let baseBubble = {}, extensionBubble = {}

	baseBubble = {
		"string": typeCheck(String),
		"number": iSNumber,
		"boolean": isBoolean,
		"array": typeCheck(Array),
		"object": typeCheck(Object),
		"function": typeCheck(Function)
	}	

	function resolve(functionName){
		functionName = functionName.toLowerCase()
		if(baseBubble[functionName])
			return baseBubble[functionName]
		if(extensionBubble[functionName])
			return extensionBubble[functionName]
		return null
	}

	function add(functionName, fn){
		extensionBubble[functionName.toLowerCase] = fn
	}

	return {
		resolve,
		add
	}
}











// Helpers
function typeCheck(fn){
	return function checker(value){
		return typeof fn() == typeof value
	}
}

function isNumber(value){
	if(isNaN(+value) || typeof value == "boolean")
			return false
		return true
}

function isBoolean(value){
	let lowCaseValue = ("" + value).toLowerCase(), acceptable = ["true", "false"]
	if(!acceptable.includes(lowCaseValue))
		return false
	return true
}
