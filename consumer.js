const { kafka, Kafka } = require("./client");
const group = process.argv[2];

async function init() {
  const consumer = Kafka.consumer({ groupId: group });
  await consumer.connect();

  await consumer.subscribe({
    topics: ["delivery-partner-update"],
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(
        `${group}: [${topic}]: PARTITION:${partition}:`,
        message.value.toString()
      );
    },
  });
}

init();
