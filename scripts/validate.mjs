import { readdir, readFile } from "node:fs/promises";
import { parse } from "yaml";

const skillsDirectory = new URL("../skills/", import.meta.url);
const skillEntries = (await readdir(skillsDirectory, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."));

function isMapping(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

async function validateSkill(directoryName) {
  const path = `skills/${directoryName}/SKILL.md`;
  try {
    const markdown = await readFile(new URL(`${encodeURIComponent(directoryName)}/SKILL.md`, skillsDirectory), "utf8");
    const frontmatter = markdown.match(/^---[ \t]*\r?\n([\s\S]*?)^---[ \t]*(?:\r?\n|$)/m);
    if (!frontmatter || frontmatter.index !== 0) {
      throw new Error("Expected YAML frontmatter at the start of the file.");
    }

    const fields = parse(frontmatter[1], { maxAliasCount: 0 });
    if (!isMapping(fields)) {
      throw new Error("Frontmatter must be a YAML mapping.");
    }

    const { name, description, license, compatibility, metadata, "allowed-tools": allowedTools } = fields;
    if (typeof name !== "string" || name.length > 64 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
      throw new Error("name must be 1–64 characters of lowercase ASCII letters, digits, and single hyphens.");
    }
    if (name !== directoryName) {
      throw new Error(`name must match the directory name "${directoryName}".`);
    }
    if (typeof description !== "string" || !description.trim() || [...description].length > 1024) {
      throw new Error("description must be a non-empty string of at most 1024 characters.");
    }
    if ("compatibility" in fields && (typeof compatibility !== "string" || !compatibility.trim() || [...compatibility].length > 500)) {
      throw new Error("compatibility must be a non-empty string of at most 500 characters.");
    }
    if ("metadata" in fields && (!isMapping(metadata) || Object.values(metadata).some((value) => typeof value !== "string"))) {
      throw new Error("metadata must be a mapping of string values.");
    }
    if (("license" in fields && typeof license !== "string") || ("allowed-tools" in fields && typeof allowedTools !== "string")) {
      throw new Error("license and allowed-tools must be strings when provided.");
    }
    if (!markdown.slice(frontmatter[0].length).trim()) {
      throw new Error("Add the skill instructions after the frontmatter.");
    }
    console.log(`Valid: ${path}`);
  } catch (error) {
    console.error(`${path}: ${error.code === "ENOENT" ? "Missing SKILL.md." : error.message}`);
    process.exitCode = 1;
  }
}

if (skillEntries.length === 0) {
  console.error("Add at least one skill at skills/<name>/SKILL.md.");
  process.exitCode = 1;
}

for (const entry of skillEntries) {
  await validateSkill(entry.name);
}
