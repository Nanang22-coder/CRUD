import http from 'http'
import url from 'url'
import qs  from 'querystring'
import db from "./conn.js"

var port = 4000
//buat koneksi
http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var id = q.query.id;

    res.setHeader('Content-Type', 'application/json');

    if(q.pathname == "/karyawan" && req.method === "GET"){
    	
    	console.log(id)

    	if(id === undefined){
    		//list name
    		let sql = "SELECT * FROM karyawanBuma";

		    db.query(sql,(err, result) => {
		        if (err) throw err;
			    
			    res.end(JSON.stringify(result));
		        
		    });

    	}else if(id > 0){
    		//get one name
    		let sql = "SELECT * FROM karyawanBuma where id = "+ id;
    		
		    db.query(sql,(err, result) => {
		        if (err) throw err;
			    
			    var name = result[0];

			    res.end(JSON.stringify(name));
		        
		    });

    	}
        
    }
    else if(q.pathname === "/karyawan" && req.method === "POST"){
    	//save name
    	var data = qs.parse(q.query)
    	var name = data.nama
    	var rp = data.nrp
    	var mail = data.email
    	
    	var sql = `INSERT INTO karyawanBuma(nama,nrp,email) VALUES('${name}','${rp}','${mail}')
    	  `
    	  console.log(q.query)
    	  console.log(name)
    	  
    	db.query(sql, function(err,result) {
    	if(err) throw err;
    	if(result.affectedRows == 1) {
    	  res.end(JSON.stringify({message: "berhasil"}))}
    	 else {
        res.end(JSON.stringify({message: "gagal"}))}
    	}
    	
    	)
  
  
  
  
}

    else if(q.pathname == "/karyawan" && req.method === "PUT"){
    	//update name  
    	var body = '';

        req.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                req.connection.destroy();
        });
    	
    	req.on('end', function () {
            
            var postData = qs.parse(body);

            let nama = postData.nama;
            let nrp = postData.nrp;
            let email = postData.email;

            let sql = `UPDATE karyawanBuma set name = '${nama}', nrp = '${nrp}', email = '${email}' where id = ${id}`

			db.query(sql,(err, result) => {
		        if (err) throw err;
			    
			    if(result.affectedRows == 1){
			    	res.end(JSON.stringify({message: 'success'}));	
			    }else{
					res.end(JSON.stringify({message: 'gagal'}));	
			    }
			    
		    });    	
    	
    	});  
    	
    }

    else if(q.pathname == "/karyawan" && req.method === "DELETE"){
    	//delete name    
    	let sql = `DELETE FROM karyawanBuma WHERE id = ${id}`
    console.log(id)
		db.query(sql,(err, result) => {
	        if (err) throw err;
		    
		    if(result.affectedRows == 1){
		    	res.end(JSON.stringify({message: 'success'}));	
		    }else{
				res.end(JSON.stringify({message: 'gagal'}));	
		    }
		    
	    });    	

    }else{

    	res.end();	

    }

     

  
}).listen(port);

console.log('server is running on http://localhost:'+ port);
