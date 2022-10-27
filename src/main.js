import "./css/index.css"
import IMask from "imask"
import Swal from "sweetalert2"

const ccBgColor01 = document.querySelector("#fill-color-one")
const ccBgColor02 = document.querySelector("#fill-color-two")
const ccLogo = document.querySelector("#icon-card")

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[`${type}`][0])
  ccBgColor02.setAttribute("fill", colors[`${type}`][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}

globalThis.setCardType = setCardType

const securityCode = document.querySelector("#security-code")
const securityCodePattern = {
  mask: "000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY ",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
}

const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2}\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "") // replace de tudo que nao é digito ser posto como vazio
    const foundMask = dynamicMasked.compiledMasks.find(({ regex }) =>
      number.match(regex)
    )
    console.log(foundMask)

    return foundMask
  },
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const addButton = document.querySelector("#button-card")

addButton.addEventListener("click", () => {
  ;(cardHolder.value.length === 0) |
  (expirationDate.value.length === 0) |
  (securityCode.value.length === 0) |
  (cardNumber.value.length === 0)
    ? Swal.fire({
        title: "Opa!",
        text: "Há campos vazios!",
        icon: "error",
        confirmButtonText: "Tente Novamente",
      })
    : Swal.fire({
        title: "Parabéns",
        text: "Seu cartão foi adicionado!",
        icon: "success",
        confirmButtonText: "Obrigada!",
      })
})

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault()
})

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerText =
    cardHolder.value.length === 0 ? "USUÁRIO SEM NOME" : cardHolder.value
})

securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value)
})

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value")
  ccSecurity.innerText = code.length === 0 ? "123" : code
}

expirationDateMasked.on("accept", () => {
  updateExpirationDate(expirationDateMasked.value)
})

function updateExpirationDate(expiration) {
  const ccExpiration = document.querySelector(".cc-expiration .value")
  ccExpiration.innerText = expiration.length === 0 ? "01/32" : expiration
}

cardNumberMasked.on("accept", () => {
  const cardTypeDynamic = cardNumberMasked.masked.currentMask.cardtype
  setCardType(cardTypeDynamic)
  updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}
