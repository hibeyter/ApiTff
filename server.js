const express = require('express');
const bodyParser = require('body-parser');
const controler = require("./app/controller/controller")
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", controler.ligler)

app.get('/lig=:lig', controler.lig)

app.get('/lig=:lig/hafta=:hafta', controler.getPuanTablosu);

app.get('/lig=:lig/hafta=:hafta/sira=:id', controler.getPuanTakim);

app.get('/lig=:lig/hafta=:hafta/mac', controler.haftaMaclari)


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});


module.exports = app;