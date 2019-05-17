# Scrape-It

Gather data from a list of websites using Google's Puppeteer tool. This project is just a demonstration so fork and rewrite as you wish!

# Getting Started

Place a folder within `data` that contains the script (`index.js`) and the url(s) that will be parsed (`index.json`).

The input data should be a JSON Array object with a list of URLs to be scraped.

Example:

```
[
  "https://google.com/",
  "https://github.com/"
]
```

File structure:

```
/data/
  /NerdyData/
    /index.js   -- (script)
    /index.json -- (input)
```

# Flags

| Test | Required |                                                                                                                                                     Description                                                                                                                                                      |
| ---- | :------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| -i   |   yes    |                                                  The name of the input folder, to be located within the `data` subfolder. This folder should have a script (`index.js`) with scraping instructions and some urls used as input (`index.json`) that will be crawled.                                                  |
| -o   |    no    |                                                                                                                  The name out the output JSON file. If omitted, the input folder name will be used.                                                                                                                  |
| -r   |    no    | A list of [resource types](https://pptr.dev/#?product=Puppeteer&version=v1.16.0&show=api-requestresourcetype) to allow when scraping. By default, all resource types apart from `document` are blocked for the sake of speed. If you require these resources, provide a comma-separated list of the types necessary. |
| -n   |    no    |                                                                                                                Disables headless mode, which is enabled by default, to allow viewing of the browser.                                                                                                                 |
