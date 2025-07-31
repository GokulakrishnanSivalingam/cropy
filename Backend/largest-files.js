const { execSync } = require("child_process");

const output = execSync(`
  git rev-list --objects --all | 
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | 
  findstr blob
`, { encoding: "utf-8" });

const sorted = output
  .split("\\n")
  .map(line => {
    const [ , , size, ...rest ] = line.split(" ");
    return { size: parseInt(size), file: rest.join(" ") };
  })
  .sort((a, b) => b.size - a.size)
  .slice(0, 20);

console.table(sorted);
