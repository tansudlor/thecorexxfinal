import user from "../../models/user";
import "../../../mongodb";

export default async function handler(req, res) {
  try {
    const person = new user({
      address: "0x12345",
      resource: [
        {
          type: "branch",
          amount: 100,
        },
        {
          type: "iron",
          amount: 110,
        },
        {
          type: "stone",
          amount: 120,
        },
      ],
      currency: [
        {
          type: "pbux",
          amount: 10,
        },
        {
          type: "pebble",
          amount: 20,
        },
        {
          type: "usdt",
          amount: 30,
        },
      ],
      upgrade: [
        {
          type: "A",
          level: 10,
        },
        {
          type: "B",
          level: 20,
        },
        {
          type: "C",
          level: 30,
        },
      ],
      score: 12345,
    });
    await person.save();
    person.u;
    res.status(200).json({ done: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
