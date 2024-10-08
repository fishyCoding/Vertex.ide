document.addEventListener("DOMContentLoaded", () => {
  const docButton = document.getElementById("doc-btn")
  const docContainer = document.getElementById("doc-container")
  const closeDocButton = document.getElementById("close-doc-btn")
  const docContent = document.getElementById("doc-content")

  docButton.addEventListener("click", async () => {
    docContainer.style.display = "block" // Show the documentation panel
  })
  closeDocButton.addEventListener("click", () => {
    docContainer.style.display = "none" // Hide the documentation panel
  })
})
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

      let line = vertexList[i]
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



document.getElementById("translate-btn").addEventListener("click", function () {
  const editor = document.getElementById("editor")
  const outputElement = document.getElementById("output")

  // Clear previous output
  outputElement.textContent = ""

  // Create a custom console.log function to capture logs
  let consoleOutput = ""
  const vertexList = editor.value.split("\n")
  let line=''
    for (let i = 0; i < vertexList.length; i++) {
      //Translates line for line and combines code into one string

      line = vertexList[i]
      consoleOutput += (i+1).toString()+"). "+translate(line.toString()).toString() + "\n"
    }

    if(consoleOutput.length<6){
          outputElement.textContent = "No output."

    }else{
      outputElement.textContent = consoleOutput
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
const tab="  "

editor.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        event.preventDefault(); // Prevent default tab behavior

        // Insert a tab character (you can use spaces for better alignment)
        const start = this.selectionStart;
        const end = this.selectionEnd;

        // Set textarea value to: text before caret + tab + text after caret
        this.value = this.value.substring(0, start) + tab + this.value.substring(end);

        // Move the caret
        this.selectionStart = this.selectionEnd = start + tab.length;

        // Update line numbers
        updateLineNumbers();
    }
});
