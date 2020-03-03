const aml = require("../index.js")

aml.settings.debugAML = true
aml.settings.debugJSGen = true

const stuff = {
    a: 10,
    b: 12,
}
console.log(
    aml`
        <div a="wat" ...${stuff} b="hi"> {
            ${100} / ${2}
            <test booleanAttr>
        }
    `
)
