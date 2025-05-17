import cron from "node-cron";
import { Todo } from "../Schemas/Todo";

export const initCronJob = (): void => {
  try {
    cron.schedule(
      "0 0 * * *", // At midnight every day
      async () => {
        try {
          console.log("Running CRON job to update expired todos");

          const currentDate = new Date();

          const result = await Todo.updateMany(
            {
              dueDate: { $lt: currentDate },
              completed: false,
            },
            {
              completed: true,
            }
          );

          console.log(`Updated ${result.modifiedCount} expired todos`);
        } catch (error) {
          console.error("CRON job error:", error);
        }
      },
      {
        timezone: "Asia/Kolkata",
      }
    );

    console.log("CRON job scheduled to run every day at midnight (IST)");
  } catch (error) {
    console.error("Failed to schedule CRON job:", error);
  }
};
