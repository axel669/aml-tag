const aml = require("../index.js")

aml.settings.debugAML = true
aml.settings.debugJSGen = true

console.log(
    aml`
        <div> {
            ${100} / ${2}
        }
    `
)
