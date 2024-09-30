function translate(input) {
  //this function translates each line of code individually
  
  trimmedInput=input.trimStart()
  Operators = ["Increase", "Subtract", "Divide", "Multiply"]
  parts = trimmedInput.split(" ")
  //split line into parts seperated by spaces

  if (parts[0] === "Set") {
    return "let " + parts[1] + "=" + parts[3]
  } else if (parts[0] == "Log") {
    return "console.log(" + parts[1] + ")"
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
    return "if (" + parts[1] + ") {"
  } else if (parts[0] == "else" && parts[1] == "if") {
    return "else if (" + parts[2] + ") {"
  } else if (parts[0] == "else") {
    return "else {"
  } else if (parts[0] == "Define" && parts[1] == "function") {
    if (parts[3] == "with" && parts[4] == "inputs:") {
      return "function " + parts[2] + "(" + parts[5] + ") {"
    } else {
      return "function " + parts[2] + "() {"
    }
  } else {
    return input
  }
}

