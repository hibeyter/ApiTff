const axios = require("axios")
const cheerio = require('cheerio');
const windows1254 = require('windows-1254');
const veriables = require('../utils/variables')

var url = function(lig, hafta = '') {
    return veriables.ligler[lig].link + '&hafta=' + hafta
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
exports.getPuanTablosu = async function(req, res) {
    axios.request({
        method: 'GET',
        url: url(req.params.lig, req.params.hafta),
        responseType: 'arraybuffer'
    }).then(resources => {
        data = puanTablosu(req.params.lig, resources)
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data));
    })
};

exports.getPuanTakim = async function(req, res) {
    axios({
        method: 'GET',
        url: url(req.params.lig, req.params.hafta),
        responseType: 'arraybuffer'
    }).then(resources => {
        data = puanTablosu(req.params.lig, resources)[req.params.id - 1]
        res.set({ 'content-type': 'application/json; charset=win-1254' });
        res.end(JSON.stringify(data));
    })
};


exports.ligler = async function(req, res) {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(veriables.ligler))
};

exports.lig = async function(req, res) {
    if (veriables.ligler[req.params.lig] != null) {
        axios.request({
            method: 'GET',
            url: url(req.params.lig),
            responseType: 'arraybuffer'
        }).then(resources => {
            data = puanTablosu(req.params.lig, resources)
            res.set({ 'content-type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(data));
        })

        /*res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(veriables.ligler[req.params.lig]))*/
    } else res.end("lig not found")

};

exports.haftaMaclari = async function(req, res) {
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

}