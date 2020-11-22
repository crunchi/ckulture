const express = require('express');
var path = require('path');
const app = new express();
const port = 3000;

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database:'ckulture'
});
connection.connect();


app.use(express.static('public'));
app.set('view engine', 'ejs'); 

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/geo', function(req, res){
	var city;
	connection.query('SELECT * from city ORDER BY RAND() limit 1', function (error, results, fields) {
	  if (error) throw error;
	 	city = results[0];
	 	res.render('geo/map',{name:city['name'],id:city['id']});
	}); 
});

app.get('/geo/answer', function(req, res){
	connection.query('SELECT * from city where id = ?',[req.query.id], function (error, results, fields) {
	  if (error) throw error;
	  city = results[0];
	  res.render('geo/soluce',{x:req.query.x,y:req.query.y,name:city['name'],solX:city['lng'],solY:city['lat']})
	});
	
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});