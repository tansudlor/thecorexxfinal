import userDB from "../../../models/user";

const uri = process.env.MONGODB_URI;
const port = process.env.MONGODB_PORT ?? "27024";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const address = req.cookies["address"];
    const data = req.body;
    console.log(data);
    data["address"] = address;
    console.log("address", address);

    if (Object.keys(data).length > 0) {
      try {
        // Find the user by their address
        const user = await userDB.findOne({ id: address });

        if (user) {
          // Update the resource and upgrade fields
          await userDB.updateOne(
            { id: address },
            {
              $set: {
                resource: data.resource, // Assuming data.resource is an object like { branch: 100, stone: 100, iron: 100 }
                upgrade: data.upgrade, // Assuming data.upgrade is an object like { battery: 0, vision: 0, control: 0, ... }
              },
            }
          );
          res.status(200).json({ message: "User updated successfully", data });
        } else {
          // If the user does not exist, you can choose to create a new user or return an error
          res.status(404).json({ message: "User not found" });
        }
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      res.status(400).json({ message: "No data provided" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
