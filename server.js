const express = require('express');
const bodyParser = require('body-parser');
const controler = require("./app/controller/controller")
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/beyter", controler.deneme)

app.get('/:hafta', controler.getPuanTablosu);

app.get('/:hafta/:id', controler.getPuanTakim);



// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
// [END app]

module.exports = app;