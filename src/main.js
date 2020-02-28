import {parse} from "./parser.js"

const amlCache = {}
const resolver = (amlString) => {
    if (amlCache[amlString] === undefined) {
        const code = parse(
            amlString,
            {}
        )

        if (aml.settings.debugJSGen === true) {
            console.log(code)
        }

        const fn = new Function("tagger", "values", `return ${code}`)
        amlCache[aml] = fn
    }

    return amlCache[aml]
}
const aml = (parts, ...values) => {
    const lead = parts.reduce(
        (stuff, raw, index) => {
            stuff.push(raw)
            if (index < values.length) {
                stuff.push(`[_${index}]`)
            }

            return stuff
        },
        []
    ).join("")

    if (aml.settings.debugAML === true) {
        console.log(lead)
    }

    const fn = resolver(lead)

    return fn(aml.settings.element, values)
}
aml.settings = {
    element: (element, attributes, ...children) => ({
        element,
        attributes,
        children,
    }),
    debugAML: false,
    debugJSGen: false,
}

export default aml
