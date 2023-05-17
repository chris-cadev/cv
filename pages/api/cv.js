import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

const parts = Object.freeze({
  profile: "cv-profile.md",
  personal: "cv-personal.md",
  experience: "cv-experience.md",
});

export default async function handler(req, res) {
  const htmlResults = {};
  const markdownToHTMLConversions = Object.keys(parts).map(async (k) => {
    const filePath = path.join(process.cwd(), parts[k]);
    const markdown = fs.readFileSync(filePath, "utf8");
    const result = await remark().use(html).process(markdown);
    htmlResults[k] = result.toString();
  });
  await Promise.all(markdownToHTMLConversions);

  res.status(200).json({ html: htmlResults });
}
