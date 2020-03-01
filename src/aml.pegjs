{
	const openBracket = String.fromCharCode(123)
    const closeBracket = String.fromCharCode(125)
}

Tag
	= _ "<" tag:(TagName / JSValue) attrs:(__ (Attribute / Comment))* _ ">" children:(_ "{" _ Item* _ "}")? _ {
    	const attr = attrs
        	.map(
            	item => item[1]
            )
            .filter(item => item !== null)
            // .map(item => `${item.name}: ${item.value}`)
            .join(", ")
    	const attributes = attrs.reduce(
        	(attr, [, pair]) => {
            	if (pair !== null) {
	            	attr[pair.name] = pair.value
                }
                return attr
            },
            {}
        )
        const childNodes = (children === null)
        	? []
            : children[3].filter(item => item !== null)
        return `tagger(${tag}, {${attr}}, ${childNodes.join(", ")})`
    }
TagName
	= $([a-z] [a-z\-]*) {return JSON.stringify(text())}
JSValue
	= "[_" index:$([0-9]+) "]" {
        return `values[${index}]`
    }
Attribute
	= name:$([a-zA-Z] [a-zA-Z\-]*) "=" value:(String / JSValue) {
    	// return {name, value}
        return `${name}: ${value}`
    }
    / "..." value:JSValue {
        return `...${value}`
    }
String
	= $('"' [^"]+ '"') {return text()}
Text
	= text:(Comment / Character)+ {
    	return JSON.stringify(
        	text
            	.join("")
            	.replace(/\s+/g, " ")
        )
    }
Character
    = [^<>{}\[\]]
    / "{{" {return openBracket}
    / "}}" {return closeBracket}
    / "[[" {return "["}
    / "]]" {return "]"}
    / "<<" {return "<"}
    / ">>" {return ">"}

Comment
	= "//" [^\n]+ {return null}

Item
	= Tag
    / JSValue
    / Text
    / Comment

__ "whitespace"
	= [ \t\n\r]+
_ "whitespace"
	= [ \t\n\r]*
