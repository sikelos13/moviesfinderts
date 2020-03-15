const http = require('http');


exports.find = (req, res) => {
    console.log("query param ", req.query.q);

    let url = "http://www.omdbapi.com/?apikey=20b99170&s="+ req.query.q +"&type=movie"

    http.get(url, (resp) => {
        resp.setEncoding('utf8');
        let rawData = '';
        resp.on('data', (chunk) => { rawData += chunk; });
        resp.on('end', () => {
            try {
                let parsedData = JSON.parse(rawData);
                console.log(parsedData);
                return res.status(200).send(parsedData);
            } catch (e) {
                console.error(e.message);
                return res.status(500).send({message: "General Error"});
            }
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        return res.status(500).send({message: "General Error"});
    });
};

exports.findByID = (req, res) => {

    let url = "http://www.omdbapi.com/?apikey=20b99170&i="+req.params.movieId +"&type=movie";

    http.get(url, (resp) => {
        resp.setEncoding('utf8');
        let rawData = '';
        resp.on('data', (chunk) => { rawData += chunk; });
        resp.on('end', () => {
            try {
                let parsedData = JSON.parse(rawData);
                console.log(parsedData);
                return res.status(200).send(parsedData);
            } catch (e) {
                console.error(e.message);
                return res.status(500).send({message: "General Error"});
            }
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        return res.status(500).send({message: "General Error"});
    });
};
