const puppeteer = require('puppeteer');

const csv = require('csv-parser');
const fs = require('fs');

var set_name = 'top500HD';

var settings ='settings/';
var dataf = 'data/images/'+set_name+'/';

var urls = settings+set_name+'.csv';

var jsurls = [];

// create destination folder if not exixts
if (!fs.existsSync(dataf)){
    fs.mkdirSync(dataf);
}

//read urls csv
fs.createReadStream(urls)
	.pipe(csv())
.on('data', (website) => {
	jsurls.push(website)
})
.on('end', () => {

    console.log('urls loaded',jsurls);

   	//cycle over csv to take screenshots
	(async (jsurls) => {
		for (let i = 0; i < jsurls.length; i++) {
		  	var  website = jsurls[i];
		  	try{
		  		const browser = await puppeteer.launch();
			    const page = await browser.newPage();
				await page.goto('https://'+website.url);
				await page.setViewport({
					width: 1668,
					height: 906,
					deviceScaleFactor: 1,
				});
				
				var timestamp = new Date().toISOString().replace(/T.+/, '');
				website.screenshotfile = dataf+ website.url+'T_'+timestamp+'.png';
				await page.screenshot({path: website.screenshotfile});
				await browser.close();
		  	}
			catch(error) {
				console.error(error);
			}
		}
	})(jsurls);

});
