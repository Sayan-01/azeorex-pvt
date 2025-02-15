import mongoose from "mongoose";
import { Schema } from "mongoose";

const templateSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  longDescription: {
    type: String,
    required: true,
  },

  theme: {
    type: String,
    required: true,
  },

  category: {
    type: [String],
    required: true,
  },

  access: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  platform: {
    type: [String],
    required: true,
  },

  feature: {
    type: [String],
    required: true,
  },

  image: {
    // url: String,
    // filename: String,
    required: true,
    type: [String],
  },

  file: {
    type: String,
  },

  datePublished: {
    type: Date,
    default: Date.now(),
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],

  owner: { type: Schema.Types.ObjectId, ref: "User" },

  likes: {
    type: [String],
    default: [],
  },
});

export const Template = mongoose.models?.templates || mongoose.model("templates", templateSchema);
//14 filds
