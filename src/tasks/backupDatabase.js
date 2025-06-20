const fs = require("fs");
const path = require("path");
const spawn = require("child_process").spawn;

async function backupDatabase() {
  const fileName = `${Math.round(Date.now() / 1000)}.dump.sql`;
  const dumpFileName = path.join(
    __dirname,
    "..",
    "storage",
    "backup-db",
    fileName
  );

  const writeStream = fs.createWriteStream(dumpFileName);

  const dump = spawn("C:\\xampp\\mysql\\bin\\mysqldump.exe", [
    "-u",
    process.env.DB_USER,
    process.env.DB_NAME,
  ]);

  //Terminal: mysqldump -uadmin -pass airbnb_dev

  dump.stdout
    .pipe(writeStream)
    .on("finish", function () {
      console.log("Completed");
    })
    .on("error", function (err) {
      console.log(err);
    });
}

module.exports = backupDatabase;
