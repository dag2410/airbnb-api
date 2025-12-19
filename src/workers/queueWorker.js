require("module-alias/register");

const { Queue } = require("@/models");
const sendVerifyEmailJob = require("@/jobs/sendVerifyEmailJob");
const { where } = require("sequelize");

const handlers = {
  sendVerifyEmailJob,
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
        }
      );
      await handler(job);
      await Queue.update(
        { status: "completed" },
        {
          where: {
            id: job.id,
          },
        }
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
        }
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

// retry queue (có 1 file sử dụng với schedule ở tasks/index)
// async function queueRetry() {
//   while (true) {
//     const jobs = await Queue.findRejectJobs();
//     for (let job of jobs) {
//       if (job.retries_count < job.max_retries) {
//         await Queue.update(job.id, {
//           status: "pending",
//           retries_count: job.retries_count + 1,
//         });
//       } else {
//         await Queue.update(job.id, {
//           status: "failed",
//         });
//       }
//     }

//     await new Promise((resolve) => setTimeout(resolve, 5000));
//   }
// }

queueWorker();
// queueRetry();
