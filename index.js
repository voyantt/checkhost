const cheerio = require("cheerio");
const superagent = require("superagent");

module.exports = (address, from = 0) => {
    return new Promise(function (resolve, reject) {
        superagent.get(`https://check-host.net/ip-info?host=${address}`).then(function (res) {
            switch (typeof from == "number" ? from : from.toLowerCase()) {
                case (0):
                case ("dbip"):
                case ("db-ip"):
                    resolve(getInfoFromHTML(res.text, "dbip"));
                break;



                case (1):
                case ("ipgeo"):
                case ("ipgeolocation"):
                    resolve(getInfoFromHTML(res.text, "ipgeolocation"));
                break;



                case (2):
                case ("ip2loc"):
                case ("ip2location"):
                    resolve(getInfoFromHTML(res.text, "ip2location"));
                break;



                case (3):
                case ("geolite2"):
                case ("maxmind-geolite2"):
                    resolve(getInfoFromHTML(res.text, "geolite2"));
                break;



                case (4):
                case ("all"):
                case ("combined"):
                    resolve([
                        getInfoFromHTML(res.text, "dbip"),
                        getInfoFromHTML(res.text, "ipgeolocation"),
                        getInfoFromHTML(res.text, "ip2location"),
                        getInfoFromHTML(res.text, "geolite2")
                    ]);
                break;



                default:
                    resolve(getInfoFromHTML(res.text, "dbip"));
                break;
            };
        });
    });
};

function getInfoFromHTML (html, from = "dbip") {
    const initialQuery = `div.centered > table > tbody > tr > td#scenter > div#content div#incontent > div > div#ip_info-${from} > div#ip_info_inside-${from} > table.inside_info > tbody > tr > td.inside_info_ipinfo > table.hostinfo > tbody`;
    const $ = cheerio.load(html);
    const tableRaw = $(initialQuery);

    if (tableRaw.length < 1) {
        return null;
    };

    const ipValues = tableRaw.children();
    const parseRegex = /(?:^ |[\n])/g;
    const ipInfo = {};

    ipInfo.ip_address           = $($(ipValues[0]).children()[1]).text().replace(parseRegex, "");
    ipInfo.hostname             = $($(ipValues[1]).children()[1]).text().replace(parseRegex, "");
    ipInfo.ip_range             = $($(ipValues[2]).children()[1]).text().replace(parseRegex, "").replace("CIDR", "").split("-");
    ipInfo.ip_range_full_string = $($(ipValues[2]).children()[1]).text().replace(parseRegex, "").replace("CIDR", "");
    ipInfo.isp                  = $($(ipValues[3]).children()[1]).text().replace(parseRegex, "");
    ipInfo.org                  = $($(ipValues[4]).children()[1]).text().replace(parseRegex, "");
    ipInfo.country              = $($(ipValues[5]).children()[1]).text().replace(parseRegex, "").split("(")[0];
    ipInfo.country_code         = null;
    ipInfo.region               = $($(ipValues[6]).children()[1]).text().replace(parseRegex, "");
    ipInfo.city                 = $($(ipValues[7]).children()[1]).text().replace(parseRegex, "");
    ipInfo.timezone             = { region: $($(ipValues[8]).children()[1]).text().replace(parseRegex, "").split(", ")[0], timezone: $($(ipValues[8]).children()[1]).text().replace(parseRegex, "").split(", ")[1] };
    ipInfo.local_time           = { now: $($(ipValues[9]).children()[1]).text().replace(parseRegex, "").split(" / ")[0], date: $($(ipValues[9]).children()[1]).text().replace(parseRegex, "").split(" / ")[1] };
    ipInfo.postal_code          = parseInt($($(ipValues[10]).children()[1]).text().replace(parseRegex, ""));

    //* FAULT HANDLING *//

    if (!ipInfo.ip_range[0]) {
        ipInfo.ip_range[0] = "";
    };

    if (!ipInfo.ip_range[1]) {
        ipInfo.ip_range[1] = "";
    };

    try {
        ipInfo.country_code     = $($(ipValues[5]).children()[1]).text().replace(parseRegex, "").split("(")[1].replace(")", "");
    } catch (e) {
        ipInfo.country_code     = "";
    };

    if (isNaN(ipInfo.postal_code)) {
        ipInfo.postal_code = "";
    };

    if (ipInfo.timezone.timezone == undefined) {
        ipInfo.timezone.timezone = "";
    };

    if (ipInfo.local_time.date == undefined) {
        ipInfo.local_time.date = "";
    };


    return ipInfo;
};
