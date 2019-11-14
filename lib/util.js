function parseInput(programInput){
	let inputWithoutSpace = removeSpaces(programInput)
	let instructions = inputWithoutSpace.split(",")
	let verboseInstruction = instructions.map(instruction => instruction.split("."))
	let finalObj = {}
	verboseInstruction.forEach(instructionSet => {
		finalObj[instructionSet.shift()] = instructionSet
	})
	return finalObj
}


module.exports = {
	parseInput
}




// Helpers
function removeSpaces(string){
	return string.replace(/\s/g, "")
}