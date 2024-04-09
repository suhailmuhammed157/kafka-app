const { Kafka } = require("./client");

const init = async () => {
  const admin = Kafka.admin();
  console.log("Admin connecting..");
  admin.connect();
  console.log("Admin connection success..");

  console.log("Creating new topic [delivery-partner-updates]..");
  await admin.createTopics({
    topics: [
      {
        topic: "delivery-partner-updates",
        numPartitions: 2, //south and north
      },
    ],
  });
  console.log("Topic created successfully..");
  console.log("Disconnecting Admin..");
  await admin.disconnect();
};

init();
