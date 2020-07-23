const defaultLigLink = 'https://www.tff.org/default.aspx?pageID='
module.exports.ligler = {
    superlig: {
        lig: 'Super Lig',
        link: defaultLigLink + 198,
    },
    tff1lig: {
        lig: 'TFF 1. Lig',
        link: defaultLigLink + 142,
    },
    tff2lig: {
        lig: 'TFF 2. Lig',
        link: defaultLigLink + 976,
    },
    tff3lig: {
        lig: 'TFF 3. Lig',
        link: defaultLigLink + 971,
    },
    sportotobal: {
        lig: 'Spor Toto Bal',
        link: defaultLigLink + 1289,
    },
    kadinlar1lig: {
        lig: 'Kadınlar 1. Lig',
        link: defaultLigLink + 1000,
    },
    kadinlar2lig: {
        lig: 'Kadınlar 2. Lig',
        link: defaultLigLink + 1001,
    },
    /*kadınlar3lig: {
        lig: 'Kadınlar 3. Lig',
        link: defaultLigLink + 1298,
    },*/
}

//div Puan tablosu
//table hafta macları

module.exports.ligElementId = {
    superlig: {
        div: 'div[id=ctl00_MPane_m_198_1890_ctnr_m_198_1890_Panel1]',
        table: 'table[id=ctl00_MPane_m_198_935_ctnr_m_198_935_dtlHaftaninMaclari]'
    },
    tff1lig: {
        div: 'div[id=ctl00_MPane_m_142_6657_ctnr_m_142_6657_Panel1]',
        table: 'table[id=ctl00_MPane_m_142_6656_ctnr_m_142_6656_dtlHaftaninMaclari]'
    },
    tff2lig: {
        div: 'div[id=ctl00_MPane_m_976_9896_ctnr_m_976_9896_Panel1]',
    },
    tff3lig: {
        div: 'div[id=ctl00_MPane_m_971_9901_ctnr_m_971_9901_Panel1]',
    },
    sportotobal: {
        div: 'div[id=ctl00_MPane_m_1289_8407_ctnr_m_1289_8407_Panel1]',
    },
    kadinlar1lig: {
        div: 'div[id=ctl00_MPane_m_1000_9271_ctnr_m_1000_9271_Panel1]',
        table: 'table[id=ctl00_MPane_m_1000_7800_ctnr_m_1000_7800_dtlHaftaninMaclari]'
    },
    kadinlar2lig: {
        div: 'div[id=ctl00_MPane_m_1001_9259_ctnr_m_1001_9259_Panel1]',
        table: 'table[id=ctl00_MPane_m_1001_9478_ctnr_m_1001_9478_dtlHaftaninMaclari]'

    },
    /*  kadınlar3lig: {
          div: 'div[id=ctl00_MPane_m_1298_9977_ctnr_m_1298_9977_Panel1]',
          // table: 'table[id=ctl00_MPane_m_1001_9478_ctnr_m_1001_9478_dtlHaftaninMaclari]'
      },*/
}