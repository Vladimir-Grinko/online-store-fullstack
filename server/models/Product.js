const { Schema, model } = require("mongoose");
const schema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        group: {
            type: String,
            required: true
        },
        price: Number,
        image: {
            type: String,
            required: true
        },
        amount: Number,
        rate: Number,
        description: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("Product", schema);
