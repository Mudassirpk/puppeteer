import puppeteer  from "puppeteer";
import fs from 'fs'

async function start() {
  const browser = await puppeteer.launch({
    headless: true,
  });


  const page = await browser.newPage();
  await page.goto("http://books.toscrape.com/", {
    waitUntil: "load",
    timeout: 0,
  });

  const titles:Array<string> = await page.evaluate(()=>{
    return Array.from(document.querySelectorAll(".product_pod > h3 > a")).map((e:HTMLAnchorElement)=>e.innerText)
  })

  fs.writeFile('public/titles.txt',titles.join("\r\n"),{encoding:"utf-8"},(error)=>{
    if(error){
      console.log("error writting to the file")
    }else{
      console.log('file written succesfully')
    }
  })

  // close the browser after scraping is done
  browser.close();
}

start();


