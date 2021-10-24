const input = document.getElementById("rating")

function setBackgroundSize(inputElement) {
  inputElement.style.setProperty("--background-size", `${getBackgroundSize(inputElement)}%`)
}

setBackgroundSize(input)
input.addEventListener("input", () => setBackgroundSize(input))

function getBackgroundSize(input) {
  const min = +input.min || 0
  const max = +input.max || 100
  const value = +input.value
  return size = (value - min) / (max - min) * 100
}