let ajvSchema ={
    "type":"object",
    "properties":{
        "prop":{"type": "string"}
    },
    "required":["prop"]
}

module.exports = ajvSchema;