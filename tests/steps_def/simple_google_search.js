const{ browser, by, element, protractor } =require('protractor');
const {Given, When, Then} =require('cucumber');
const {expect}=require('chai');



    Given(/^I am opening google search page$/,{timeout:10000},  async function(){
		browser.ignoreSynchronization = true;		
		await browser.get('https://google.com');
		await browser.sleep(5000);
		
	});
	
	When(/^I am typing "(.+)" in search field$/,{timeout:10000},  async function(search){
			
		let serachBtnXpath="//*[contains(@id,'searchf')]/descendant::*[contains(@value, 'Google') and @name='btnK' and self::*/ancestor::div[@class='FPdoLc VlcLAe']]";
		let serachFieldXpath=".//*[contains(@id,'searchf')]/descendant::*[contains(@name,'q') and self::*/ancestor::div[contains(@class,'SDkEP')]]";		
		
	    let searchField=await element(by.xpath(serachFieldXpath));
		let searchBtn=await element(by.xpath(serachBtnXpath));
		let googleLogo=await element(by.xpath('//*[@id="hplogo"]'))
		await searchField.sendKeys(search);
		await googleLogo.click();
		await searchBtn.click();		 
		 await browser.sleep(5000);
	});
	
	Then(/^I shold get nasa officual site as first result$/,{timeout:10000},  async function(){
		let parentElemXpath="//*[@id='search']/descendant::*[child::*/child::a[@href='https://www.nasa.gov/']]";
		//let elem=`${parentElemXpath}/descendant::span[@class='st']`;
		
		let xpath="//*[@id='search']/descendant::*[child::*/child::a[@href='https://www.nasa.gov/']]/descendant::span[@class='st']"
		//expect(element(by.xpath(parentElemXpath)).isDisplayed()).to.eventually.be.true;
		expect(await element(by.xpath(xpath)).getText()).to.have.string(".gov brings you the latest news, images and videos from America's space agency");
	});
	
