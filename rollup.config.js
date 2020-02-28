import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"

export default {
    input: "./src/main.js",
    output: [
        {
            file: "index.js",
            format: "cjs",
        },
        {
            file: "browser/aml.js",
            format: "iife",
            name: "aml",
        },
    ],
    plugins: [
        resolve(),
        commonjs(),
    ],
}
