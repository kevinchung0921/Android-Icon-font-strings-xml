var rl = require('readline').createInterface({
	input: require('fs').createReadStream(process.env.FILE)
});

var state = 0;
var buf = "";
/*
	.mdi-access-point:before {
	  content: "\F002";
	}
*/
rl.on('line', function(line) {
	switch(state) {
		case 0:
			if(line.indexOf(".mdi-")==0 && line.indexOf(":") >0) {
				buf = "<string name=\""+line.substring(1,line.indexOf(":")).replace(/-/g,"_")+"\"> ";
				state = 1;
				// console.log(buf);
			}
			break;
		case 1: {
			if(line.indexOf("content") > 0) {
			  line = line.substring(line.indexOf("\\")+1,line.indexOf("\\")+5);
			  line = "&#x"+line+';'+" </string> ";
			  buf += line;
			  console.log(buf);
			  buf = "";
				state = 0;
			}
		}
	}
})