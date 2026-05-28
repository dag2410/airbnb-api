require("module-alias/register");
const scheduleJob = require("@/utils/scheduler");
// const sendDailyResortEmail = require("@/tasks/sendDailyReportEmail");
const backupDatabase = require("@/tasks/backupDatabase");
const retryFailJob = require("@/tasks/retryFailJob");
const expirePendingBookings = require("@/tasks/expirePendingBookings");
const updateBookingStatuses = require("@/tasks/updateBookingStatuses");

//send daily email
// scheduleJob("sendDailyResortEmail", "0 2 * * *", sendDailyResortEmail);

// Backup database
// scheduleJob("backupDatabase", "0 30 2 * * *", backupDatabase);

// Retry fail job(5m/1)
scheduleJob("retryFailJob", "* */5 * * * *", retryFailJob);

scheduleJob("expirePendingBookings", "0 * * * * *", expirePendingBookings);

scheduleJob("updateBookingStatuses", "0 * * * * *", updateBookingStatuses);
