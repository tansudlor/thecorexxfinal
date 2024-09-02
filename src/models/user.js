import { Battery, Currency, Magnet } from "lucide-react";
import "../../mongodb";
import mongoose from "mongoose";

const COLLECTION = "users";

const ResourceSchema = new mongoose.Schema(
  {
    branch: { type: Number, default: 0 },
    stone: { type: Number, default: 0 },
    iron: { type: Number, default: 0 },
  },
  { strict: false }
);

const CurrencySchema = new mongoose.Schema(
  {
    brk: { type: Number, default: 0 },
    pebble: { type: Number, default: 0 },
    usdt: { type: Number, default: 0 },
    pbux: { type: Number, default: 0 },
    lotto: { type: Number, default: 0 },
  },
  { strict: false }
);

const UpgradeSchema = new mongoose.Schema(
  {
    battery: { type: Number, default: 0 },
    vision: { type: Number, default: 0 },
    control: { type: Number, default: 0 },
    barrior: { type: Number, default: 0 },
    magnet: { type: Number, default: 0 },
    lucky: { type: Number, default: 0 },
    engine: { type: Number, default: 0 },
  },
  { strict: false }
);

const Schema = new mongoose.Schema({
  id: { type: String, required: true },
  address: { type: String, required: true },
  resource: { type: ResourceSchema, default: () => ({}) },
  currency: { type: CurrencySchema, default: () => ({}) },
  upgrade: { type: UpgradeSchema, default: () => ({}) },
  score: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models[COLLECTION] ||
  mongoose.model(COLLECTION, Schema);
