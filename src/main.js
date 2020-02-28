import {parse} from "./parser.js"

const amlCache = {}
const resolver = (aml) => {
    if (amlCache[aml] === undefined) {
        const code = parse(
            aml,
            {}
        )

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

    const fn = resolver(lead)

    return fn(React.createElement, values)
}

export default aml
