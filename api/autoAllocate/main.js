const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { error, time } = require("console");
const axios = require("axios");
const fs = require('fs');
const { off } = require("process");
const { stringify } = require("querystring");
dotenv.config();

// axios.get("https://api.nusmods.com/v2/2021-2022/moduleList.json")
// .then(response => {
//     const data = JSON.stringify(response.data);
//     fs.writeFileSync('modules.json', data);
// } )
// .catch((err)=>(console.log(err)))


const allSems = [
    ["MA1301","ES1000","ES1103"],
    ["CS1010S", "MA2002", "DSA1101", "HSI1000", "HSS1000", "CFG1002"],
    ["CS2040", "ST2131", "HSA1000", "HSH1000", "ALS1010", "MA2001", "MA2104", "DTK1234"],
    ["SP1541", "CS2030", "CS3244", "ST2132", "DSA2101", "CS1231S"],
    ["CS3243", "IS1108", "CS2102", "DSA2102", "ST3131", "ST3236", "CFG1004"],
    ["DSA3310"],
    ["CS4243", "CS2103T", "CS2101", "HSI2013", "DSA3101", "PC1421", "CS2100", "GEN2050"],
    ["CS2106", "CS5242", "CS3230", "DSA3102", "HS2901", "CS4248", "CS4244"],
    ["CP3200", "CP4101", "HS2904", "CS4246", "CS4225", "CS5340"],
    ["CS5260", "DSA4265", "DSA4212"]
  ];
const flattenedAllSems = allSems.flat();
const moduleConversion = {
    "MA1101R": "MA2001",
    "MA1104": "MA2104",
    "MA1102R": "MA2002"
}
const rawListOfModule = {
    commonModule: ["CS1010S","DSA1101","HSI1000","HSS1000","HSA1000","HSH1000","DTK1234","SP1541","IS1108","HSI2013","GEN2050","HS2904","HS2901"],
    coreModule: ["CFG1002","ALS1010","MA2002","CS2040","ST2131","MA2001", "MA2104", "CS2030", "CS3244", "ST2132", "DSA2101", "CS1231S","CS3243","CS2102", "DSA2102", "ST3131", "ST3236",
    "CS4243", "CS2103T", "CS2101",  "DSA3101", "CS2100", "CS2106", "CS5242", "CS3230", "DSA3102", "CS4248", "CS4244","CP3200", "CP4101", "CS4246", "CS4225", "CS5340", "CS5260", "DSA4265", "DSA4212"]
}
//check if a module inside an array of modules
function improvedInclude (list, string) {
    // Case of old Module and new Module Converstion
    if (string in moduleConversion) string = moduleConversion[string]
    for (const element of list) {
        // Compare only the first chars: means CS1231 === CS1231S
        let length = 0;
        if (string.length > element.length) {
            length = element.length
        } else {
            length = string.length
        }
        let flag = true;
        
        for (let index = 0; index < length; index++) {
            if (string.charAt(index) !== element.charAt(index)) {
                flag = false;
                break
            }
        }
        

        if (flag === true) {
            return true
        }
    }
    return false 
}
//check if a module inside an array of modules that return moduleCode 
function improvedIncludeReturnMod (list, string) {
    // Case of old Module and new Module Converstion
    if (string in moduleConversion) string = moduleConversion[string]
    for (const element of list) {
        // Compare char by char: means CS1231 === CS1231S
        let length = 0;
        if (string.length > element.length) {
            length = element.length;
        } else {
            length = string.length;
        }
        let flag = true;
        
        for (let index = 0; index < length; index++) {
            if (string.charAt(index) !== element.charAt(index)) {
                flag = false;
                break;
            }
        }
        

        if (flag === true) {
            return element
        }
    }
    return false 
}
// get boolean key in preq Tree
const getFirstKey = (obj) => Object.keys(obj)[0];
// Decide between object and string for preq Tree traversal
const typeOfGroup = group => Object.prototype.toString.call(group) == '[object String]'? "String": "Object";

// Check with previous sems and the preqTree Rules if a module is valid in that sem
function validify (prevSems, preqTreeList, module) {
    const preqTree = preqTreeList[module];
    if (preqTree === undefined || preqTree === null) {return true}
    const flattenedPrevSems = prevSems.flat();
    const helperFunc = (preqTree) => {
        if (typeOfGroup(preqTree) === "String") {
            result = improvedInclude(flattenedPrevSems,preqTree) ? true : false;
            // console.log(`Validify ${JSON.stringify(preqTree)} is ${result}`)
            
            return result
        }
        else {
            const booleanWord = getFirstKey(preqTree);
            
            if (booleanWord === "and") {
                const result = preqTree[booleanWord].reduce((a,v) => helperFunc(v)&&a,true)
                // console.log(`result and of ${JSON.stringify(preqTree[booleanWord])} = ${result}`);
                return result
            } else {
                const result = preqTree[booleanWord].reduce((a,v) => helperFunc(v)||a,false)
                // console.log(`result or of ${JSON.stringify(preqTree[booleanWord])} = ${result}`);
                return result
        }
    }}
    return helperFunc(preqTree)
}

// Go through the whole time table and return modules that has error
function validifyAll (allSems, preqTreeList) {
    let failed = []
    for (let index = allSems.length -1 ; index > -1; index--) {
        console.log(`Checking sem ${index}`)
        const thisSem = allSems[index];
        console.log(JSON.stringify(thisSem));
        for (const module of thisSem) {
            console.log(`Checking module ${module}`)
            if (validify(allSems.slice(0,index),preqTreeList,module)===false) {
                console.log(`Validify ${module} failed`)
                failed.push(module)
            }
        }
        
    }
    console.log(failed);
    return true
}

// Check if any mod is SUable
const SUablePreq = ["ES1000", "ES1103", "MA1301"]
const hasCommonElement = (arr1, arr2) => arr1.some(r=> arr2.includes(r))
function seperateModuleCode (module) {return module.split(/([0-9]+)/)}
function isSUable (preqTreeList, module) {
    const [facultyCode, numberCode, specialCode] = seperateModuleCode(module);
    //Case HSI2XXX
    if (numberCode.charAt(0) === "2" && facultyCode === "HSI") return false
    //Case MA2001 for example
    else if (numberCode.charAt(0) === "2" && 
    (preqTreeList[module] === undefined || 
        hasCommonElement(Object.values(preqTreeList[module]), SUablePreq))) 
        {return true}
    // Usual 1K mods
    else if (numberCode.charAt(0) === "1") return true
    // The rest
    return false
}
// Get priority for each module depends on the no. of appearence in each other tree
function getPriority(moduleList, preqTreeList) {

    const helperFunc = (preqTree) => {
        if (typeOfGroup(preqTree) === "String") {
            result = improvedIncludeReturnMod(moduleList,preqTree)
            if (result) {modulePriorityDict[result] += 1}
        }
        else if (preqTree === undefined || preqTree === null) {return}
        else {
            const booleanWord = getFirstKey(preqTree);
            for (const object of preqTree[booleanWord]) {
                helperFunc(object);
            }
        }
    }

    const modulePriorityDict = moduleList.reduce((a, v) => ({ ...a, [v]: 0}), {});
    for (const module of moduleList) {
        // console.log(`Adding module ${module}`)
        helperFunc(preqTreeList[module]);
        }
    return modulePriorityDict
}
//Add common curriculum to timetable
function addingCommomModule(commonModpriority, timetable, numberOfSems) {
    const convertCommonMod = { 
        10: [3, 3, 2, 1, 1],
        11: [4, 3, 2, 1, 1],
        12: [4, 3 ,2, 2, 1],
        13: [4, 4, 2, 1, 1, 1],
        14: [4, 4, 2, 2, 1, 1],
     };
    const commonModArrangement = convertCommonMod[commonModpriority.length];
    let numberOfCommonModTaken = 0;
    for (const ModAmount of commonModArrangement) {
        const thisSem = commonModpriority.slice(numberOfCommonModTaken, numberOfCommonModTaken + ModAmount).map(e => e[0]);
        numberOfCommonModTaken = numberOfCommonModTaken + ModAmount;
        timetable.push(thisSem);
    }
    const existingSem = timetable.length - 1;
    for (let index = existingSem; index < numberOfSems; index++) {
        timetable.push([]);

    }
}
//Add core modules to timetable
function addingCoreModule(coreModPriority, numberOfSems, maxwWorkLoadSem1, maxWorkLoad, timetable, CreditList, preqTreeList) {
    let unresolvedArray = [];
    for (let moduleArray of coreModPriority) {

        const module = moduleArray[0];
        let flag = true;
        for (let sem = 0; sem < numberOfSems; sem++) {
            let maxWorkLoadThisSem = (sem === 0) ? maxwWorkLoadSem1 : maxWorkLoad;
            if (getTotalWorkload(timetable[sem + 1], CreditList) + getModuleMC(module, CreditList) <= maxWorkLoadThisSem) {
                if (validify(timetable.slice(0, sem + 1), preqTreeList, module)) {
                    console.log(`Adding Module ${module} to sem ${sem + 1}`);
                    timetable[sem + 1].push(module);
                    flag = false;
                    break;
                }
            }
        }
        let unresolvedArrayLoop = JSON.parse(JSON.stringify(unresolvedArray));
        for (unresolvedModule of unresolvedArrayLoop) {
            for (let sem = 0; sem < numberOfSems; sem++) {
                let maxWorkLoadThisSem = (sem === 0) ? maxwWorkLoadSem1 : maxWorkLoad;
                if (getTotalWorkload(timetable[sem + 1], CreditList) + getModuleMC(module, CreditList) <= maxWorkLoadThisSem) {
                    if (validify(timetable.slice(0, sem + 1), preqTreeList, unresolvedModule)) {
                        console.log(`Adding Module ${unresolvedModule} to sem ${sem + 1}`);
                        timetable[sem + 1].push(unresolvedModule);
                        unresolvedArray = unresolvedArray.filter(e => e != unresolvedModule);
                        break;
                    }
                }
            }
        }
        if (flag) {
            unresolvedArray.push(module);
        }

    }
}
// filter exemption mod
// sort by K-level (1XXX is before 2XXX)
// Sort by priority level
// Sort by number of MC
function sortModulePriorty(priorityList, exemption) {
    return priorityList
        .filter(element => exemption.includes(element[0]) === false)
        .sort((a, b) => seperateModuleCode(a[0])[1].charAt(0) - seperateModuleCode(b[0])[1].charAt(0))
        .sort((a, b) => a[2] - b[2])
        .sort((a, b) => b[1] - a[1])
}

function addModuleMC(priorityList, CreditList) {
    return Object.entries(priorityList).map(module => {
        const moduleCredit = (CreditList[module[0]]==undefined) ? 4: Number(CreditList[module[0]]);
        module.push(moduleCredit);
        return module
    })
}
function getModuleMC(module, CreditList) {
    const returnValue = CreditList[module] ?? 4;
    return Number(returnValue)
}
function getTotalWorkload(modules, CreditList) {
    return modules.reduce((a, v) => a + Number(getModuleMC(v,CreditList)), 0)
}

function roundToNextMultipleOf4(x) {
    return Math.ceil(x / 4) * 4;
}

function getMaxWorkLoadperSem(totalWorkload, numberOfSems, isallowedSem1Overload) {
    if (isallowedSem1Overload) { 
        const maxWorkLoad = roundToNextMultipleOf4((totalWorkload - 22) / (numberOfSems)) + 2;
        return [maxWorkLoad, maxWorkLoad]
    }
    else {
        const maxWorkLoad = roundToNextMultipleOf4((totalWorkload - 22) / (numberOfSems-1)) + 2;
        return [22, maxWorkLoad]
    }
}
function autoAllocateTimetable(rawListOfModule, numberOfSems, isallowedSem1Overload ) {
const rawData = fs.readFileSync("AllModuleDetails.json"); 
const modules = (JSON.parse(rawData))
const CreditList = modules.reduce((a, v) => ({ ...a, [v.moduleCode]: v.moduleCredit }), {}) 
const preqTreeList = modules.reduce((a, v) => ({ ...a, [v.moduleCode]: v.prereqTree}), {}) 
// const fulfillReqList = modules.reduce((a, v) => ({ ...a, [v.moduleCode]: v.fulfillRequirements}), {}) 

// List of Modules Taken
const fullModuleList = Object.values(rawListOfModule).flat();


const totalWorkload = (getTotalWorkload(fullModuleList,CreditList))
//Get max workload per sem
const [maxwWorkLoadSem1, maxWorkLoad] = getMaxWorkLoadperSem(totalWorkload,numberOfSems,isallowedSem1Overload)


const exemption = ["ES1000", "ES1103", "MA1301"]
const priorityList = getPriority(fullModuleList, preqTreeList)
const priorityListWithMC = addModuleMC(priorityList,CreditList)
const sortable = sortModulePriorty(priorityListWithMC, exemption)
// console.log(sortable)
const commonModpriority = sortable.filter(e=>rawListOfModule.commonModule.includes(e[0]))

const timetable = []

// Add exemption mod as Sem 0
timetable.push(exemption);
addingCommomModule(commonModpriority, timetable, numberOfSems);


const coreModPriority = sortable.filter(e=>rawListOfModule.coreModule.includes(e[0]))
addingCoreModule(coreModPriority, numberOfSems, maxwWorkLoadSem1, maxWorkLoad, timetable, CreditList, preqTreeList);

return timetable
}
console.log(autoAllocateTimetable(rawListOfModule, 8, false))

function checkMissingModule (rawListOfModule) {
    const rawData = fs.readFileSync("AllModuleDetails.json"); 
    const modules = (JSON.parse(rawData))
    const CreditList = modules.reduce((a, v) => ({ ...a, [v.moduleCode]: v.moduleCredit }), {}) 
    const fullModuleList = Object.values(rawListOfModule).flat();
    const fullModule = modules.map(e=>e.moduleCode)
    fullModuleList.filter(e => !(fullModule.includes(e)))
}

// checkMissingModule(rawListOfModule)



