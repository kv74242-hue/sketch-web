const sketchBoard = document.querySelector(".sketchBoard")
const randomColors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "cyan"]
const input = document.querySelector("input")
const defaultGridSize = 16
let currentColor = "black"
let isDrawing = false

function buildGrid(size) {
    sketchBoard.innerHTML = ""
    sketchBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    sketchBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div")
        cell.className = "grid-cell"
        sketchBoard.appendChild(cell)
    }
}

function paintCell(event) {
    if (event.target.classList.contains("grid-cell")) {
        event.target.style.backgroundColor = currentColor
    }
}

buildGrid(defaultGridSize)

sketchBoard.addEventListener("pointerdown", (event) => {
    isDrawing = true
    paintCell(event)
})
sketchBoard.addEventListener("pointerover", (event) => {
    if (isDrawing) {
        paintCell(event)
    }
})
document.addEventListener("pointerup", () => {
    isDrawing = false
})

document.querySelector(".BlackBtn").addEventListener("click", () => {
    currentColor = "black"
})
document.querySelector(".GreyBtn").addEventListener("click", () => {
    currentColor = "grey"
})
document.querySelector(".RandomBtn").addEventListener("click", () => {
    currentColor = randomColors[Math.floor(Math.random() * randomColors.length)]
})
document.querySelector(".ResetBtn").addEventListener("click", () => {
    input.value = defaultGridSize
    buildGrid(defaultGridSize)
})

document.querySelector(".SubmitBtn").addEventListener("click", () => {
    if (input.checkValidity()) {
        buildGrid(input.valueAsNumber)
    } else {
        input.reportValidity()
    }
})