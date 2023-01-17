"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
async function start() {
    const browser = await puppeteer_1.default.launch({
        headless: true,
    });
    const page = await browser.newPage();
    const query = "iphone pro";
    const preparedQuery = query.replace(" ", "+");
    await page.goto(`https://www.amazon.com/s?k=${preparedQuery}&crid=OPRVLIT0W890&sprefix=led+monit%2Caps%2C1101&ref=nb_sb_noss_2`, {
        waitUntil: "load",
        timeout: 0,
    });
    const product_list = await page.evaluate(() => {
        const product_card = Array.from(document.querySelectorAll(".s-card-container"));
        const product_information = product_card.map((product) => {
            const title = product.querySelector("h2 >a >span");
            const price = product.querySelector(".a-price > span");
            return { title: title.innerText, price: price.innerText };
        });
        return product_information;
    });
    if (product_list) {
        console.log(product_list);
    }
    // close the browser after scraping is done
    browser.close();
}
start();
//# sourceMappingURL=index.js.map