import "dotenv/config";
import { app } from "./server/server";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
