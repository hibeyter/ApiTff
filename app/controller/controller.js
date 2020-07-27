const axios = require("axios")
const cheerio = require('cheerio');
const windows1254 = require('windows-1254');
const veriables = require('../utils/variables');


exports.getPuanTablosu = async function(req, res) {
    if (kontrol(req.params.lig)) {
        axios.request({
            method: 'GET',
            url: url(req.params.lig, req.params.hafta),
            responseType: 'arraybuffer'
        }).then(resources => {
            data = puanTablosu(req.params.lig, resources)
            res.set({ 'content-type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(data));
        })
    } else {
        res.status(400).json({ message: 'Lig not found' })
    }
};

exports.getPuanTakim = async function(req, res) {
    if (kontrol(req.params.lig)) {
        axios({
            method: 'GET',
            url: url(req.params.lig, req.params.hafta),
            responseType: 'arraybuffer'
        }).then(resources => {
            data = puanTablosu(req.params.lig, resources)[req.params.id - 1]
            res.set({ 'content-type': 'application/json; charset=win-1254' });
            res.end(JSON.stringify(data));
        })
    } else {
        res.status(400).json({ message: 'Lig not found' })
    }
};


exports.ligler = async function(req, res) {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(veriables.ligler))
};

exports.lig = async function(req, res) {

    if (kontrol(req.params.lig)) {
        axios.request({
            method: 'GET',
            url: url(req.params.lig),
            responseType: 'arraybuffer'
        }).then(resources => {
            data = puanTablosu(req.params.lig, resources)
            res.set({ 'content-type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(data));
        })
    } else res.status(400).json({ message: 'Lig not found' })
};

exports.haftaMaclari = async function(req, res) {
    if (kontrol(req.params.lig)) {
        axios.request({
            method: 'GET',
            url: url(req.params.lig, req.params.hafta),
            responseType: 'arraybuffer'
        }).then(resources => {
            const $ = cheerio.load(windows1254.decode(resources.data.toString('binary')));
            var data = []
            $(veriables.ligElementId[req.params.lig].table)
                .children("tbody").children("tr").each((index, element) => {
                    if (index != 0) {
                        var mac = {}
                        $(element).children('td').children('table').children('tbody')
                            .children('tr').children('td').each((i, tdElement) => {
                                switch (i) {
                                    case 0:
                                        {
                                            var mDate = '';
                                            $(tdElement).children('b').children('span').each((i, spanElement) => {
                                                mDate += $(spanElement).text() + " "
                                            })
                                            mac.T = mDate.trim()
                                        }
                                        break;
                                    case 2:
                                        mac.E = $(tdElement).children('a').children('span').text();
                                        break;
                                    case 3:
                                        {
                                            $(tdElement).children('b').children('a').children('span').each((i, spanElement) => {
                                                if (i == 0) mac.ES = parseInt($(spanElement).text())
                                                else mac.KS = parseInt($(spanElement).text())
                                            })
                                        }
                                        break;
                                    case 4:
                                        mac.K = $(tdElement).children('a').children('span').text();
                                        break;
                                }
                            })
                        if (Object.keys(mac).length) {
                            data[index - 1] = mac
                        }
                    }
                })
            res.set({ 'content-type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(data))
        })
    } else res.end("Lig not found")

}

exports.tumHaftalar = async function(req, res) {
    axios({
        method: 'GET',
        url: url(req.params.lig),
        responseType: 'arraybuffer'
    }).then(resources => {
        allData = {}
        allData.puantablosu = puanTablosu(req.params.lig, resources)
        allData.fikstur = dataHaftalar(req.params.lig, resources)
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(allData))
    })

}

var dataHaftalar = function(lig, resources) {
    const $ = cheerio.load(windows1254.decode(resources.data.toString('binary')));
    haftalar = []
    haftaIndex = 0;
    $(veriables.ligElementId[lig].allTable).children("table").children("tbody")
        .children("tr").each((index, element) => {
            $(element).children("td").each((i, firstTdElement) => {
                $(firstTdElement).children("table").children("tbody").children("tr").each((j, firtTrElement) => {
                    hafta = {}
                    maclar = []
                    if (j != 0) {
                        $(firtTrElement).children("td").children("table").children("tbody").children("tr").each((k, seconTrElement) => {
                            mac = {}
                            $(seconTrElement).children("td").each((l, seconTdElement) => {
                                if (l == 0) mac.E = $(seconTdElement).children("a").text()
                                if (l == 1) {
                                    var text = $(seconTdElement).children("a").text()
                                    mIndex = text.indexOf(" ");
                                    mac.ES = text.substring(0, mIndex)
                                    mac.KS = text.substring(mIndex + 2, text.length)
                                }
                                if (l == 2) mac.K = $(seconTdElement).children("a").text()
                            })
                            maclar[k] = mac
                        })
                        haftalar[haftaIndex++] = maclar
                    }
                })
            })
        })
    return haftalar
}

var url = function(lig, hafta = '') {
    return veriables.ligler.find(e => e.r === lig).link + '&hafta=' + hafta
}

var kontrol = function(lig) {
    if (veriables.ligler.find(e => e.r === lig)) return true
    return false
}

var puanTablosu = function(lig, resources) {
    const $ = cheerio.load(windows1254.decode(resources.data.toString('binary')));
    var data = [];
    $(veriables.ligElementId[lig].div).children("table")
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
                            takim.N = content
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
                data[index - 1] = takim;
            }
        })
    return data
}