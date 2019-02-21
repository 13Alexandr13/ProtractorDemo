const args =require('./cliArgParser');
console.log('args'+ '='+args)
console.log(args);
console.log('multicapabilities'+ '='+args.get('multi_Capab'));
//seleniumAddress: 'http://localhost:4445/wd/hub'
//seleniumServerJar:`${__dirname}/SeleniumServer/selenium-server-standalone-3.141.59.jar`,
exports.config = {  
   seleniumServerStartTimeout:10000,
  seleniumAddress: 'http://localhost:4445/wd/hub',
  
  getPageTimeout: 60000,
  allScriptsTimeout: 500000,
  framework: 'custom',
  // path relative to the current config file
  frameworkPath: require.resolve('protractor-cucumber-framework'),
   
  specs: [
    'tests/features/*.feature'
  ],
  
  multiCapabilities:args.get('multi_Capab'),
  
  cucumberOpts: {
    require: ['./tests/steps_def/*.js'],
    tags:args.get('cucmb_tags'),
	format:['progress','json:reports/cucumber_json_reports/report.json'],
	strict:true,
    profile: false,
    'no-source': true
  }, 
  
  plugins: [{
	  package:'protractor-multiple-cucumber-html-reporter-plugin',
	  options:{
		  automaticallyGenerateReport: true, //no explicit call is needed to generate report
		  removeExistingJsonReportFile:true, //keep only latest report for feature file
		  removeOriginalJsonReportFile:false, // remove cucumber json report 
		  jsonOutputPath:`${__dirname}/reports/multiple-cucumber-html`,//directory to store json reports file
		  reportPath:'reports/multiple-cucumber-html/report' , // hml report is saved in specified folder
		  displayDuration:true,
		customData: {
			title: 'Run info',
			data: [
				{label: 'Project', value: 'ProtractorDemo'},
				{label: 'Execution Start Time', value: ' '},
				{label: 'Execution End Time', value: ' '}
			]
} 		  
	  }
  }]
  
  
  
  
}