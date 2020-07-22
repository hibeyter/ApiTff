const axios = require("axios")
const cheerio = require('cheerio');

//const url = "https://www.tff.org/Default.aspx?pageID=198&hafta=34#grpctl00_MPane_m_198_935_ctnr_m_198_935"

var url = function(hafta) {
    return 'https://www.tff.org/Default.aspx?pageID=198&hafta=' + hafta + '#grpctl00_MPane_m_198_935_ctnr_m_198_935'
}

exports.getPuanTablosu = function(req, res) {
    axios.get(url(req.params.hafta)).then(resources => {
        const $ = cheerio.load(resources.data, { decodeEntities: true })
        var data = [];
        $("div[id=ctl00_MPane_m_198_1890_ctnr_m_198_1890_Panel1]").children("table")
            .children("tbody").children("tr")
            .each((index, element) => {
                if (index != 0) {
                    var takim = {};
                    $(element).children("td").each((i, tdElement) => {
                        var content = $(tdElement).children("span").text();
                        if (content.length < 1) {
                            content = $(tdElement).children("a,b").children("span").text();
                            if (content.length < 1) {
                                content = $(tdElement).children("a,b").children("a,b").text();
                            }
                        }
                        switch (i) {
                            case 0:
                                takim.name = content
                                break;
                            case 1:
                                takim.O = parseInt(content)
                                break;
                            case 2:
                                takim.G = parseInt(content)
                                break;
                            case 3:
                                takim.B = parseInt(content)
                                break;
                            case 4:
                                takim.M = parseInt(content)
                                break;
                            case 5:
                                takim.A = parseInt(content)
                                break;
                            case 6:
                                takim.Y = parseInt(content)
                                break;
                            case 7:
                                takim.AV = parseInt(content)
                                break;
                            case 8:
                                takim.P = parseInt(content)
                                break;
                        }
                    })
                    data[index - 1] = { takim };
                }
            })
        res.end(JSON.stringify(data));
    })
};

exports.getPuanTakim = function(req, res) {
    axios.get(url(req.params.hafta)).then(resources => {
        const $ = cheerio.load(resources.data)
        var data = [];
        $("div[id=ctl00_MPane_m_198_1890_ctnr_m_198_1890_Panel1]").children("table")
            .children("tbody").children("tr")
            .each((index, element) => {
                if (index != 0) {
                    var takim = {};
                    $(element).children("td").each((i, tdElement) => {
                        var content = $(tdElement).children("span").text();
                        if (content.length < 1) {
                            content = $(tdElement).children("a,b").children("span").text();
                            if (content.length < 1) {
                                content = $(tdElement).children("a,b").children("a,b").text();
                            }
                        }
                        switch (i) {
                            case 0:
                                takim.name = content
                                break;
                            case 1:
                                takim.O = parseInt(content)
                                break;
                            case 2:
                                takim.G = parseInt(content)
                                break;
                            case 3:
                                takim.B = parseInt(content)
                                break;
                            case 4:
                                takim.M = parseInt(content)
                                break;
                            case 5:
                                takim.A = parseInt(content)
                                break;
                            case 6:
                                takim.Y = parseInt(content)
                                break;
                            case 7:
                                takim.AV = parseInt(content)
                                break;
                            case 8:
                                takim.P = parseInt(content)
                                break;
                        }
                    })
                    data[index - 1] = { takim };
                }
            })
        res.end(JSON.stringify(data[req.params.id - 1]));
    })
};

exports.deneme = async function(req, res) {
    axios({ method: 'GET', url: url(34), responseType: 'arraybuffer' })
        .then(function(response) {
            //console.log(response.data)
            /* const $ = cheerio.load(response.data)
             console.log($("div[id=ctl00_MPane_m_198_1890_ctnr_m_198_1890_Panel1]").html())*/
        });


    res.end("hello")
};