
const ColorThief = require('colorthief');
const fs = require('fs');

var set_name = 'top500HD';

var settings ='settings/';
var dataf = 'data/images/'+set_name+'/';
var palettef = 'data/palette/'+set_name+'/';

var timestamp = new Date().toISOString().replace(/T.+/, '');

var urls = settings+''+set_name+'.csv';
var palettes = palettef+'palettes_'+timestamp+'.csv';

var fields = [
		'filename',
		'url',
		'date',
		'colorid',
		'red',
		'green',
		'blue'
];
const opts = { fields };

var newLine= "\r\n";

// create destination folder if not exixts
if (!fs.existsSync(palettef)){
    fs.mkdirSync(palettef);
}

fs.readdir(dataf, (err, files) => {
  files.forEach(file => {
    console.log(file);
    getPalette(file);
  });
});

function getPalette(filename) {  		

	console.log(dataf+''+filename);


		ColorThief.getPalette(dataf+''+filename, 7)
		    .then(palette => { 
		    	console.log(palette);
		    	palette.forEach((color,colorIndex)=>{

		    		var row = [
		    			filename,
			    		filename.split('.png')[0].split('T_')[0],
			    		filename.split('.png')[0].split('T_')[1],
			    		colorIndex,
						color[0],
						color[1],
						color[2]	
			    	];

			    	console.log(row);

			    	fs.stat(palettes, function (err, stat) {
					    if (err == null) {
					        //console.log('File exists');

					        fs.appendFile(palettes, row.join(',')+''+newLine, function (err) {
					            if (err) throw err;
					            //console.log('The row was appended to file!');
					        });
					    }
					    else {
					        //write new file
					        //console.log('New file: header + first line');
					        csv= ((fields).join(',') + newLine) + row.join(',')+''+newLine;

					        fs.writeFile(palettes, csv, function (err) {
					            if (err) throw err;
					            //console.log('file created');
					        });
					    }
					});

		    	});
		    	
		    })
		    .catch(err => { console.log(err) })
}



