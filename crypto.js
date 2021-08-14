let link = "https://coinmarketcap.com/"
let request = require("request");
let cheerio = require("cheerio");
const { group } = require("console");
console.log("Before")
request(link, cb);

function cb(error, response, html) {
    if (error) {
        console.log("error", + error);
    }
    else if (response.statusCode == 404) {
        console.log("Page Not Found")
    }
    else {

        dataExtracter(html)

    }

}

function dataExtracter(html) {
    let searchTool = cheerio.load(html)
    let cryptoArr = searchTool("table>tbody>tr")
    // console.log(cryptoArr.length)
    for (let i = 0; i < cryptoArr.length; i++) {
        let cols = searchTool(cryptoArr[i]).find("td");
        let aElem = searchTool(cols[2]).find("a");
        let crytpoLInk = aElem.attr("href")
        let fullCryptoLink = `https://coinmarketcap.com${crytpoLInk}`
        // console.log(fullCryptoLink)
        let crypto = searchTool(cols[2]).find("p").text();

        let correctName = [];
       correctName.push(crypto)
    
    //    let cn=correctName.split("1")
        // console.log("cryptoName"+ " " + correctName+"\n")
        // console.log(cn)
    request(fullCryptoLink,newcb)



    }
}
function newcb(error,response,html){
    if (error) {
        console.log(error); //print the error if one occured
    }
    else if (response.statusCode == 404) {
        console.log("Page Not Found")
    }
    else {
        // console.log(html); //print the HTML  for the request made
        // console.log("html",);
        getcryptoData(html);
    }
}

function getcryptoData(html){
    let searchTool = cheerio.load(html);
    let headingsArr = searchTool("div>div>table>tbody>tr>th");
    let headingsArr2 = searchTool("div>div>table>tbody>tr>td");
    let tradingVol = searchTool(headingsArr[3]).text()+"\t"+searchTool(headingsArr2[3]).text();
    let cryptoPrice = searchTool(headingsArr[0]).text()+"   "+"\t"+searchTool(headingsArr2[0]).text();
    let priceChange = searchTool(headingsArr[1]).text()+"\t"+"\t"+searchTool(headingsArr2[1]).text();
    let lowHi = searchTool(headingsArr[2]).text()+"\t"+searchTool(headingsArr2[2]).text();
    // let  marketCap= searchTool(headingsArr[4]).text()+"\t"+searchTool(headingsArr2[3]).text();
    let  marketDom= searchTool(headingsArr[5]).text()+"\t"+searchTool(headingsArr2[5]).text();
    let  rank= searchTool(headingsArr[6]).text()+"\t"+"\t"+searchTool(headingsArr2[6]).text();
    let  marketcap= searchTool(headingsArr[7]).text()+"\t"+"\t"+searchTool(headingsArr2[7]).text();

    
    console.log(cryptoPrice+"\n"+priceChange+"\n"+lowHi+"\n"+tradingVol+"\n"+marketDom+"\n"+rank+"\n"+marketcap)
    // console.log(tradingVol)
console.log("--------------------------------------------------------------------")
}
console.log("after");


