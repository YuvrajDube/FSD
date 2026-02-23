import fs from "fs/promises";
async function createDir() {
  await fs.mkdir("myFolder");
  console.log("Directory created ✅");
}

async function readDir() {
  const files = await fs.readdir("myFolder");
  console.log("Files:", files);
}

async function removeDir() {
  await fs.rm("myFolder", { recursive: true });
  console.log("Directory removed ❌");
}

async function runAsync() {
  await createDir();
  await readDir();
  await removeDir();
}

runAsync();