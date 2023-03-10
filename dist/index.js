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
    const query = "TV";
    const preparedQuery = query.replace(" ", "+");
    await page.goto(`https://www.amazon.com/s?k=${preparedQuery}&crid=OPRVLIT0W890&sprefix=led+monit%2Caps%2C1101&ref=nb_sb_noss_2`, {
        waitUntil: "load",
        timeout: 0,
    });
    // fetch product card(html)
    const product_list = await page.evaluate(() => {
        const product_card = Array.from(document.querySelectorAll(".s-card-container"));
        // array of products(objects)
        const product_information = product_card.map((product) => {
            const title = product.querySelector("h2 >a >span");
            const price = product.querySelector(".a-price > span");
            const image = product.querySelector(".s-image-fixed-height > img");
            const details_link = product.querySelector("h2 > a");
            const ratting = product.querySelector(".a-icon-star-small > span");
            return {
                title: title?.innerText,
                price: price?.innerText,
                image: image?.getAttribute("src"),
                details_link: "https://www.amazon.com" + details_link?.getAttribute("href"),
                ratting: ratting
                    ? parseFloat(ratting.innerText.split(" ")[0])
                    : "nothing",
            };
        });
        return product_information;
    });
    if (product_list) {
        const sorted_by_ratting = product_list.sort((p1, p2) => {
            if (p1.ratting < p2.ratting) {
                return -1;
            }
            else if (p1.ratting > p2.ratting) {
                return 1;
            }
            else
                return 0;
        });
        console.log(sorted_by_ratting);
    }
    // close the browser after scraping is done
    browser.close();
}
start();
//# sourceMappingURL=index.js.map