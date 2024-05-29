import pkg from 'mongoose';
const { connect, connection, disconnect } = pkg;

const uri = process.env.MONGO_DB_URL;

const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
};

async function run() {
  try {

    await connect(uri, clientOptions);
    await connection.db.admin().command({ ping: 1 });
    console.log("Database connected");
  } catch (error) {
    console.error("Error: ", error);

  }
}
run().catch((error) => console.log(error));
