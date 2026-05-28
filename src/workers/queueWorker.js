require("module-alias/register");

const { Queue } = require("@/models");
const sendVerifyEmailJob = require("@/jobs/sendVerifyEmailJob");
const handlePaymentResult = require("@/jobs/handlePaymentResult");

const handlers = {
  sendVerifyEmailJob,
  handlePaymentResult,
};

async function jobProcess(job) {
  const handler = handlers[job.type];
  if (handler) {
    try {
      await Queue.update(
        { status: "processing" },
        {
          where: {
            id: job.id,
          },
        },
      );
      await handler(job);
      await Queue.update(
        { status: "completed" },
        {
          where: {
            id: job.id,
          },
        },
      );
    } catch (error) {
      await Queue.update(
        {
          status: "reject",
          retry_at: new Date(Date.now() + 5000),
        },
        {
          where: {
            id: job.id,
          },
        },
      );
    }
  }
}

async function queueWorker() {
  while (true) {
    const jobs = await Queue.findAll({
      where: {
        status: "pending",
      },
      limit: 5,
    });
    for (let job of jobs) {
      await jobProcess(job);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

queueWorker();
