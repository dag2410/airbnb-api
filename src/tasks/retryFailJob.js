const queueModel = require("@/models/queue.model");

async function retryFailJob() {
  const jobs = await queueModel.findRejectJobs();
  if (!jobs.length) return;
  for (let job of jobs) {
    if (job.retries_count < job.max_retries) {
      await queueModel.update(job.id, {
        status: "pending",
        retries_count: job.retries_count + 1,
      });
    } else {
      await queueModel.update(job.id, {
        status: "failed",
      });
    }
  }
}

module.exports = retryFailJob;
