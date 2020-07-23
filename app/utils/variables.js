const defaultLigLink = 'https://www.tff.org/default.aspx?pageID='
module.exports.ligler = [{
        lig: 'Super Lig',
        link: defaultLigLink + 198,
        r: "superlig",
    },
    {
        lig: 'TFF 1. Lig',
        link: defaultLigLink + 142,
        r: 'tff1lig',
    },
    {
        lig: 'Kadınlar 1. Lig',
        link: defaultLigLink + 1000,
        r: 'kadinlar1lig',
    },
    {
        lig: 'Kadınlar 2. Lig',
        link: defaultLigLink + 1001,
        r: 'kadinlar2lig',
    },

]

//div Puan tablosu
//table hafta macları

module.exports.ligElementId = {
    superlig: {
        div: 'div[id=ctl00_MPane_m_198_1890_ctnr_m_198_1890_Panel1]',
        table: 'table[id=ctl00_MPane_m_198_935_ctnr_m_198_935_dtlHaftaninMaclari]',
    },
    tff1lig: {
        div: 'div[id=ctl00_MPane_m_142_6657_ctnr_m_142_6657_Panel1]',
        table: 'table[id=ctl00_MPane_m_142_6656_ctnr_m_142_6656_dtlHaftaninMaclari]',
    },
    kadinlar1lig: {
        div: 'div[id=ctl00_MPane_m_1000_9271_ctnr_m_1000_9271_Panel1]',
        table: 'table[id=ctl00_MPane_m_1000_7800_ctnr_m_1000_7800_dtlHaftaninMaclari]',
    },
    kadinlar2lig: {
        div: 'div[id=ctl00_MPane_m_1001_9259_ctnr_m_1001_9259_Panel1]',
        table: 'table[id=ctl00_MPane_m_1001_9478_ctnr_m_1001_9478_dtlHaftaninMaclari]',
    },

}