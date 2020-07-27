const express = require('express');
const bodyParser = require('body-parser');
const controler = require("./app/controller/controller")
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", controler.ligler) // Bütün ligleri getirir

app.get('/lig=:lig', controler.lig) // istenilen ligdeki  puan tablosunu getirir

app.get('/lig=:lig/haftalar', controler.tumHaftalar) // istenilen ligdeki puan tablosu ve tüm hafta skorlarını getirir

app.get('/lig=:lig/hafta=:hafta', controler.getPuanTablosu); //istenilen ligdeki istenilen haftaya ait puan tablosu

app.get('/lig=:lig/hafta=:hafta/sira=:id', controler.getPuanTakim); // istenilen ligdeki-> istenilen haftaya ait->istenilen sırada bulunan takım

app.get('/lig=:lig/hafta=:hafta/fikstur', controler.haftaMaclari) //istenilen haftanın macları 


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});


module.exports = app;