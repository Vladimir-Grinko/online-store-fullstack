const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        name: {
            type: String
        },
        groupId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("Group", schema);
