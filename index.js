var puppeteer = require("puppeteer");
var elements = 369;
var pages = elements / 18;
var browser;
async function run() {
  browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://airbnb.com/login");

  await page.click('[data-testid*="social-auth-button-email"]');
  await page.type("#email-login-email", "Andest86@cuvox.de");

  await page.click(".t1ng71ne");

  var passwordInput = "#email-signup-password";
  await page.waitForSelector(passwordInput);
  await page.type(passwordInput, "98989796!9796!");
  await page.click(".t1dqvypu");
  await page.waitForSelector(".c14whb16");

  console.log("Logged In");

  await page.goto("https://www.airbnb.com/s/Madinaty--Cairo-Governorate--Egypt/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2023-07-01&monthly_length=3&price_filter_input_type=0&price_filter_num_nights=5&channel=EXPLORE&query=Madinaty%2C%20Cairo%20Governorate&place_id=ChIJRwPSlwEeWBQRO-D9PGcV6Hc&date_picker_type=calendar&checkin=2023-06-13&checkout=2023-06-14&source=structured_search_input_header&search_type=autocomplete_click")
  await page.waitForSelector('span.tyi4kqb.dir.dir-ltr')
  const [getXpath] = await page.$x('//*[@id="site-content"]/div/div[1]/div/div/div/section/h1/span');
  result =  await page.evaluate(name => name.textContent, getXpath);
  console.log(result)
  elements = parseInt(result.slice(14).split(" ")[0])
  pages = Math.ceil(elements / 18);
  await sendMessages(page)
  
}

var startPoint = 0;
async function sendMessages(page) {
  const hrefs = await page.$$eval('a.l1ovpqvx.bn2bl2p.dir.dir-ltr', links => links.map(a => a.href));
  for (let i = 0; i < hrefs.length; i++) {
    const href = hrefs[i];
    const singlePage = await browser.newPage();


    await singlePage.goto(href)
    console.log("- Sending message to new home.")
    startPoint = startPoint + 1;
    
    try {
      
      await singlePage.waitForSelector("a.l1ovpqvx.b1sef8f2.c3dg75g.dir.dir-ltr");
      await singlePage.click("a.l1ovpqvx.b1sef8f2.c3dg75g.dir.dir-ltr");
      console.log("clicked contact-host")
    } catch (error) {
      await singlePage.waitForSelector("a.l1ovpqvx.bmx2gr4.c1ih3c6.dir.dir-ltr");
      await singlePage.click("a.l1ovpqvx.bmx2gr4.c1ih3c6.dir.dir-ltr");
      console.log("clicked message-host")
      
    }

    await singlePage.waitForSelector("._69l1qs");
    await singlePage.type("._69l1qs", "Please if u can also share more details I will appreciate that");
    await singlePage.waitForSelector('[data-testid*="send-message-button"]');
    await singlePage.click('[data-testid*="send-message-button"]');
    await singlePage.waitForSelector("span.ll4r2nl.dir.dir-ltr")
    await singlePage.close()
    if (startPoint == 18 && pages != 0) {
      startPoint = 0;
      pages = pages - 1;
      await page.click('a.l1ovpqvx.c1ytbx3a.dir.dir-ltr')
      await page.waitForSelector('a.l1ovpqvx.bn2bl2p.dir.dir-ltr')
      console.log("Navigating to new page")
      console.log("Remaining pages: " + pages)
      await sendMessages(page)

      
    }
  }

}

run();
