const fse=require('fs-extra');
const args= require('minimist')(process.argv.slice(2),{
	strings:['browser', 'tagName', 'baseUrl']		
});

var tagN,browserNames='undefined';
var parsedArgs=new Map();
//Output entered args;
console.log(args);

//initializing parameters with default values
const options =new Map();
options.set('browser', ['chrome']);
options.set('tagNames',['simple_google_search']);
options.set('baseUrl',['https://google.com']);

//get optios names from console input
const keyArr=Array.from(options.keys());
console.log(`opt keys: ${keyArr}`);

Array.from(keyArr).forEach((elem)=>{
	if (typeof args[elem]==='string'  &&  typeof args[elem]!=="undefined"){
		options.set(`${elem}`,args[elem].split(','));
	}
});
console.log(`Args passed: tags:${options.get('tagNames')}; browsers:${options.get('browser')}`);

//clear cucumber reports dir 
fse.emptyDir(`${__dirname}\\reports\\cucumber_json_reports`).then(() => {
	  console.log('old reportst cleared!')
	}).catch(err => {
	  console.error(err)
	});
	
//run protractor 

const execute=require('child_process').exec;	
		let start=`${__dirname}/node_modules/.bin/webdriver-manager update && ${__dirname}/node_modules/.bin/webdriver-manager start --detach --seleniumPort 4445`;
		let run_tests=`${__dirname}/node_modules/.bin/protractor ${__dirname}/protractor.conf.js --browser ${options.get('browser')} --tagNames ${options.get('tagNames')} --baseUrl ${options.get('baseUrl')}  && node makeHTMLRep `;
		let shutdown=`${__dirname}/node_modules/.bin/webdriver-manager shutdown`
		//execute(start).stdout.pipe(process.stdout);
		execute(start+'&&'+run_tests).stdout.pipe(process.stdout);
		

		
		
		
		
		
		
		
		
		