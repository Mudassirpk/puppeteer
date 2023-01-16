"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const fs_1 = __importDefault(require("fs"));
async function start() {
    const browser = await puppeteer_1.default.launch({
        headless: true,
    });
    const page = await browser.newPage();
    await page.goto("http://books.toscrape.com/", {
        waitUntil: "load",
        timeout: 0,
    });
    const titles = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".product_pod > h3 > a")).map((e) => e.innerText);
    });
    fs_1.default.writeFile('public/titles.txt', titles.join("\r\n"), { encoding: "utf-8" }, (error) => {
        if (error) {
            console.log("error writting to the file");
        }
        else {
            console.log('file written succesfully');
        }
    });
    browser.close();
}
start();
//# sourceMappingURL=index.js.map
