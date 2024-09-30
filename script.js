document.getElementById("run-btn").addEventListener("click", function () {
  const editor = document.getElementById("editor")
  const outputElement = document.getElementById("output")

  // Clear previous output
  outputElement.textContent = ""

  // Create a custom console.log function to capture logs
  let consoleOutput = ""
  const customConsole = {
    log: function (message) {
      consoleOutput += message + "\n"
    },
  }

  // Try to execute the translated code
  try {
    // Translate the Vertex code to JavaScript
    let translatedCode = ""
    const vertexList = editor.value.split("\n")
    console.log(vertexList.length)
    for (let i = 0; i < vertexList.length; i++) {
      //Translates line for line and combines code into one string

      line = vertexList[i]
      console.log(translate(line.toString()).toString() + "\n")
      translatedCode += translate(line.toString()).toString() + "\n"
    }
		console.log(translatedCode)

    // Use the Function constructor to run the translated code safely
    const userCode = new Function("console", translatedCode)
    userCode(customConsole) // Pass the custom console to capture logs
		
    // Display the captured output
    outputElement.textContent = consoleOutput || "No output."
    
  } catch (error) {
    outputElement.textContent = "Error: " + error.message 
  }
})

// Line Numbers
const editor = document.getElementById("editor")
const lineNumbers = document.getElementById("line-numbers")

// Update the line numbers
function updateLineNumbers() {
  const lines = editor.value.split("\n").length
  lineNumbers.innerHTML = ""
  for (let i = 1; i <= lines; i++) {
    lineNumbers.innerHTML += i + "<br>"
  }
}

// Synchronize scrolling
editor.addEventListener("scroll", function () {
  lineNumbers.scrollTop = editor.scrollTop
})

// Update line numbers as the user types
editor.addEventListener("input", updateLineNumbers)

// Trigger line numbers update on page load
updateLineNumbers()

// The translate function to convert Vertex to JavaScript
function translate(input) {
  //this function translates each line of code individually
  input.trimStart()
  Operators = ["Increase", "Subtract", "Divide", "Multiply"]
  parts = input.split(" ")
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


editor.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        event.preventDefault(); // Prevent default tab behavior

        // Insert a tab character (you can use spaces for better alignment)
        const start = this.selectionStart;
        const end = this.selectionEnd;

        // Set textarea value to: text before caret + tab + text after caret
        this.value = this.value.substring(0, start) + '\t' + this.value.substring(end);

        // Move the caret
        this.selectionStart = this.selectionEnd = start + 1;

        // Update line numbers
        updateLineNumbers();
    }
});


