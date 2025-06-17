require("module-alias/register");

const queueModel = require("@/models/queue.model");
const sendVerifyEmailJob = require("@/jobs/sendVerifyEmailJob");

const handlers = {
  sendVerifyEmailJob,
};

async function jobProcess(job) {
  const handler = handlers[job.type];
  if (handler) {
    try {
      await queueModel.update(job.id, { status: "processing" });
      await handler(job);
      await queueModel.update(job.id, { status: "completed" });
    } catch (error) {
      await queueModel.update(job.id, {
        status: "reject",
        retry_at: new Date(Date.now() + 5000),
      });
    }
  }
}

async function queueWorker() {
  while (true) {
    const jobs = await queueModel.findPendingJobs();
    for (let job of jobs) {
      await jobProcess(job);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

async function queueRetry() {
  while (true) {
    const jobs = await queueModel.findRejectJobs();
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

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}

queueWorker();
queueRetry();
