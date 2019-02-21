const reporter = require('cucumber-html-reporter');
const fs =require('fs');
const fse = require('fs-extra');

const pref=`${__dirname}\\reports\\cucumber_json_reports`;
let fileNames=fs.readdirSync(`${__dirname}\\reports\\cucumber_json_reports`,'utf8',true);

fileNames.forEach((elem)=>{
	console.log(elem)
});

let jsonRepNames=[];
fileNames.forEach((elem)=>{
	if (elem.search(/.\.json/)){
		jsonRepNames.push(elem);
	} else {
	}
});
	
let name="";	
if (jsonRepNames.length>1 ||  jsonRepNames.length==0){
	name=jsonRepNames[0];
}else {
	name=jsonRepNames[0];
}
 
let cucmb_report_path=`${pref}\\${name}`;
 
var options = {
        theme: 'bootstrap',
        jsonFile: cucmb_report_path,
        output: './reports/cucumber-html-reporter/cucumber_report.html',
        reportSuiteAsScenarios: true,
        launchReport: true,
        
    };
 
    reporter.generate(options);
	
 
    //more info on `metadata` is available in `options` section below.
 
    //to generate consodilated report from multi-cucumber JSON files, please use `jsonDir` option instead of `jsonFile`. More info is available in `options` section below.
 