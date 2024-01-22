import { model, Schema, models } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: String, required: true },
  cluster: { type: String },
  images: [{ type: String }],
  properties: { type: String },
}, {
  timestamps: true,
});

export const Product = models.Product || model('Product', ProductSchema);