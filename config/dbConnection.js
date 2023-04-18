const mongoose = require('mongoose');

const connectdb = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_Connect, {
      // Some common settings (You don't need to understand these)
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ignoreUndefined: true,
    });
    console.log(
      'Database connected',

      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectdb;
