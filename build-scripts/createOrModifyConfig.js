/**
 * Created by Geramy92 on 08.09.2016.
 */

/**
 * Parameter for CLI
 * --config= - config file
 * --ef - create from example file | if this is not set the given json is modified.
 */
let fs = require("fs");

let data = {};
let configFile = false;
let writeToConfig = false;
let createByExample = false;

process.argv.forEach(function (val) {
    let variable = val.split("=", 1)[0];
    let value = val.split("=");
    value.shift();
    value = value.join("=");

    if (variable === "--config") {
        configFile = value;
    } else if (variable === "--ef") {
        createByExample = true;
    } else {
        data[variable] = value;
    }
});

if (!configFile) {
    console.error("ERROR: No config file set. CLI-Argument --config required!");
    process.exit(1);
}

writeToConfig = configFile + ".json";

if (createByExample) {
    configFile = configFile + "-example.json";
} else {
    configFile = writeToConfig;
}

if (fs.existsSync("src/configs/" + configFile)) {
    let json = require("../src/configs/" + configFile);
    for (let theKey in json){
        if (data.hasOwnProperty(theKey)) {
            json[theKey] = data[theKey];
        }
    }

    fs.writeFileSync("src/configs/" + writeToConfig, JSON.stringify(json));
    console.info("done");
} else {
    if (createByExample) {
        console.error("ERROR: Config-Examplefile does not exist.");
    } else {
        console.error("ERROR: Configfile does not exist. (Use --ef to use example files)");
    }
    process.exit(1);
}