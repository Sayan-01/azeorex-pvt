"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
var mongoose_1 = require("mongoose");
var mongoose_2 = require("mongoose");
var templateSchema = new mongoose_2.Schema({
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
            type: mongoose_2.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: { type: mongoose_2.Schema.Types.ObjectId, ref: "User" },
    likes: {
        type: [String],
        default: [],
    },
});
exports.Template = ((_a = mongoose_1.default.models) === null || _a === void 0 ? void 0 : _a.templates) || mongoose_1.default.model("templates", templateSchema);
//14 filds
