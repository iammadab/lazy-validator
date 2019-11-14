module.exports = createResolver

function createResolver(){
	let baseBubble = {}, extensionBubble = {}

	baseBubble = {
		"string": typeCheck(String),
		"number": isNumber,
		"boolean": isBoolean,
		"array": typeCheck(Array),
		"object": typeCheck(Object),
		"function": typeCheck(Function),
		"hasproperty": hasProperty
	}	

	function resolve(functionName){
		functionName = functionName.toLowerCase()
		if(baseBubble[functionName])
			return baseBubble[functionName]
		if(extensionBubble[functionName])
			return extensionBubble[functionName]
		return { error: true, error_string: `Invalid type (${functionName})`}
	}

	function add(functionName, fn){
		extensionBubble[functionName.toLowerCase()] = fn
	}

	return {
		resolve,
		add
	}
}











// Helpers
function hasProperty(obj, name){
	if(obj.hasOwnProperty(name))
		return { error: false, data: name }
	return { error: true, error_string: `Expected property called (${name})` }
}

function typeCheck(fn){
	return function checker(value, name){
		if(typeof fn() == typeof value)
			return { error: false, data: value }
		return { error: true, error_string: `Expected (${typeof fn()}) for (${name}) instead got (${typeof value})` }
	}
}

function isNumber(value, name){
	if(isNaN(+value) || typeof value == "boolean")
			return { error: true, error_string: `Expected (number) for (${name}) instead got (${typeof value})` }
		return { error: false, data: +value }
}

function isBoolean(value, name){
	let lowCaseValue = ("" + value).toLowerCase(), acceptable = ["true", "false"]
	if(!acceptable.includes(lowCaseValue))
		return { error: true, error_string: `Expected (boolean) for (${name}) instead got (${typeof value})` }
	return { error: false, data: value }
}
