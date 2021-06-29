const app = require("./App");
import { connectToDB } from "./db/dbConfig";
import "dotenv/config";

connectToDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
