import { Router } from "express";
import { renderFile } from "ejs";
import { resolve } from "path";
import { CreateOptions, create } from "html-pdf";
import { passengers } from "../../database.json";
import { launch } from "puppeteer";

const routes = Router();

routes.get("/", (request, response) => {
  renderFile(resolve("src", "model.ejs"), { passengers }, (error, html) => {
    if (error) {
      return response.send(error);
    }

    return response.send(html);
  });
});

routes.get("/pdf", async (request, response) => {
  const browser = await launch();
  const page = await browser.newPage();

  await page.goto(`http://localhost:8080/`, { waitUntil: "networkidle0" });
  const pdf = await page.pdf({
    printBackground: true,
    format: "A4",
    margin: { bottom: 0, left: 0, right: 0, top: 0 },
  });

  await browser.close();

  response.contentType("application/pdf");
  return response.send(pdf);
});

export { routes };
