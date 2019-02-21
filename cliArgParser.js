
const args= require('minimist')(process.argv.slice(2),{
	strings:['browser', 'tagName', 'baseUrl']		
});

var tagN,browserNames='undefined';
var parsedArgs=new Map();
//Output entered args;
console.log(args);

//options values set by default
const options =new Map();
options.set('browser', ['chrome']);
options.set('tagNames',['simple_google_search']);
options.set('baseUrl',['https://google.com']);

//get optios values from console input
const keyArr=Array.from(options.keys());
console.log(`opt keys: ${keyArr}`);

Array.from(keyArr).forEach((elem)=>{
	if (typeof args[elem]==='string'  &&  typeof args[elem]!=="undefined"){
		options.set(`${elem}`,args[elem].split(','));
	}
});
console.log(`Args passed: tags:${options.get('tagNames')}; browsers:${options.get('browser')}`)

//add "@" symbol to each tagName
const cuc_tags=((t)=>{
				let res=[];
				t.forEach((elem)=>{
				res.push(`@${elem}`);
				});
				return res;
				})(options.get('tagNames'));			
options.set('tagNames', cuc_tags);

//compose capabilitise object
let multiCapab=[];
options.get('browser').forEach((browser)=>{
	let capab={};
	capab['browserName']=browser.split(':')[0];
	if (browser.split(':')[0]==='firefox'){
		capab['moz:firefoxOptions']={args:['--window-size=800,600']};
		if (browser.split(':')[1]==='headless'){
			capab['moz:firefoxOptions']['args'].push('--headless');
		}
	}
	else{
		capab[`${browser.split(':')[0]}Options`]={args:['--window-size=800,600']};
		if (browser.split(':')[1]==='headless'){
			capab[`${browser.split(':')[0]}Options`]['args'].push('--headless');
		}	
	}
	multiCapab.push(capab);
});
//console.log(multiCapab);
let cucTags=[];
options.get('tagNames').forEach((tag)=>{
	cucTags.push(tag);
});


parsedArgs.set('multi_Capab', multiCapab);
parsedArgs.set('cucmb_tags',cucTags);
//console.log(parsedArgs);
module.exports=parsedArgs;






