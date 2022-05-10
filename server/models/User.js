const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },

        basket: [
            {
                _id: { type: Schema.Types.ObjectId, ref: "Product" },
                count: Number,
                price: Number
            }
        ],
        purchases: [
            {
                _id: { type: Schema.Types.ObjectId, ref: "Product" },
                count: Number,
                price: Number
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = model("User", schema);
