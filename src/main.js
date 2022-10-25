import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector("#fill-color-one")
const ccBgColor02 = document.querySelector("#fill-color-two")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][0])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

setCardType("mastercard")

// security code
const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "0000",
}

const securityCodeMasked = IMask(securityCode, securityCodePattern)
