function combineFromIndex(index, array) {
    // If index is out of bounds (negative or equal to length), return an empty string
    if (index < 0 || index >= array.length) {
        return ''; // Return an empty string for out-of-bounds indices
    }
    
    return array.slice(index).join(' ');
}

let variableList=[]
function translate(input) {

  //this function translates each line of code individually
  
  trimmedInput=input.trimStart()
  Operators = ["Increase", "Subtract", "Divide", "Multiply"]
  parts = trimmedInput.split(" ")
  //split line into parts seperated by spaces

  if (parts[0] === "Set") {
    if (variableList.includes(parts[1])){
        return parts[1] + "=" + combineFromIndex(3,parts)
    }else{
        variableList.push(parts[1])
        return "let " + parts[1] + "=" + combineFromIndex(3,parts)

    }

  } else if (parts[0] == "Log") {
    return "console.log(" +combineFromIndex(1,parts) + ")"
  } else if (parts[0] == "Loop") {
    if (parts[2] == "through") {
      return "for (" + parts[1] + " of " + parts[3] + ") {"
    } else {
      switch (parts.length) {
        case 4:
          return (
            "for (let " +
            parts[1] +
            "=0; " +
            parts[1] +
            "<" +
            parts[3] +
            "; " +
            parts[1] +
            "++) {"
          )
        case 7:
          return (
            "for (let " +
            parts[1] +
            "=" +
            parts[6] +
            "; " +
            parts[1] +
            "<" +
            parts[3] +
            "; " +
            parts[1] +
            "++) {"
          )
        case 10:
          return (
            "for (let " +
            parts[1] +
            " = " +
            parts[6] +
            "; " +
            parts[1] +
            " < " +
            parts[3] +
            "; " +
            parts[1] +
            " += " +
            parts[9] +
            ") {"
          )

        default:
          return "console.log('Error')"
      }
    }
  } else if (Operators.includes(parts[0])) {
    let opperator = ""
    switch (parts[0]) {
      case "Increase":
        opperator = "+"
        break
      case "Subtract":
        opperator = "-"
        break
      case "Multiply":
        opperator = "*"
        break
      case "Divide":
        opperator = "/"
        break
    }
    return parts[1] + opperator + "=" + parts[3]
  } else if (parts[0] == "if") {
    return "if (" + combineFromIndex(1,parts) + ") {"
  } else if (parts[0] == "else" && parts[1] == "if") {
    return "else if (" + combineFromIndex(2,parts) + ") {"
  } else if (parts[0] == "else") {
    return "else {"
  } else if (parts[0] == "Define" && parts[1] == "function") {
    if (parts[3] == "with" && parts[4] == "inputs:") {
      return "function " + parts[2] + "(" + combineFromIndex(5,parts) + ") {"
    } else {
      return "function " + parts[2] + "() {"
    }
  } else if (parts[0]=="End"){
    return "}"
  } else if (parts[0]=="Return"){
    return "return "+parts[1]
  } else if (parts[0]=="Terminate"){
        let base ='break'
        if (parts.length==1) {
            return base
        } else{
            if (parts[1]=='when'){
                return 'if ('+combineFromIndex(2,parts)+') '+base
            }
        }
  } else if (parts[0]=="Skip"){
        let base ='continue'
        if (parts.length==1) {
            return base
        } else{
            if (parts[1]=='when'){
                return 'if ('+combineFromIndex(2,parts)+') '+base
            }
        }
  } else if (parts[0]=="If" && parts[2]=="is" && parts[3]=="equal..."){
      return "switch ("+parts[1]+") {"
  } else if (parts[0]=="To"){
      return "case "+parts[1]+":"
  } else if (parts[0]=="While"){
      return "while("+parts[1]+") {"
  }

  
  else {
    return trimmedInput
  }
}
