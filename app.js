const express = require('express');
const request = require('request');
const app = express();
app.engine('html', require('ejs').renderFile);
app.use(express.static("public"));

app.get("/", async function(req, res){
    let jsonified = await getImages();
    res.render("index.ejs", {"images":jsonified});
});

app.get("/results", async function(req, res){
    let keyword = req.query.keyword;
    let orientation = req.query.orientation;
    let jsonified = await getImages(keyword, orientation);

    res.render("results.ejs", {"images":jsonified});
});

function getImages(keyword, orientation){
    return new Promise( function(resolve, reject){
        request('https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=' + keyword + "&orientation=" + orientation, function (error, response, body) {
            if(!error && response.statusCode == 200){
                 let jsonified = JSON.parse(body);
                 resolve(jsonified);
            }else{
                reject(error);
                console.log(response.statusCode);
                console.log(error);
            }
        });
    });
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Running Express Server...");
});