# How Chuck updates the website (no coding)

The Publications and Projects pages come from a Google Sheet. Edit the sheet; the website updates by itself within about 5 minutes.

## One-time setup (done once, with help)
1. Go to sheets.google.com, click **Blank** > **File > Import > Upload** and choose `CGC_website_data.xlsx` ("Replace spreadsheet").
2. Check there are two tabs named **Publications** and **Projects**.
3. **File > Share > Publish to web**. Under "Link", pick the **Publications** tab and **Comma-separated values (.csv)**, click **Publish**, and copy the link.
4. Repeat for the **Projects** tab.
5. On GitHub, open `static/config.js`, click the pencil icon, paste the two links between the quotes, and click **Commit changes**.

## Every day after that
- **Add** a row at the bottom (or anywhere) of the right tab. **Edit** or **delete** rows normally.
- Keep the column headings in row 1 exactly as they are.
- Publications columns: Date, Title, Authors, Publisher, Link (web address starting with https://, or leave blank), Keywords (comma-separated).
- Projects columns: Year, Topic, Client, Role.
- Rows with an empty Title (Publications) or Topic (Projects) are hidden.
