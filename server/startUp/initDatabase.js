const catalogMock = require("../mock/catalog.json");
const goodsMock = require("../mock/goods.json");
const Group = require("../models/Group");
const Product = require("../models/Product");

module.exports = async () => {
    const catalog = await Group.find();
    if (catalog.length !== catalogMock.length) {
        await createInitialEntity(Group, catalogMock);
    }
};

// module.exports = async () => {
//   const goods = await Product.find();
//   if (goods.length !== goodsMock.length) {
//     await createInitialEntity(Product, goodsMock);
//   }
// };

async function createInitialEntity(Model, data) {
    await Model.collection.drop();
    return Promise.all(
        data.map(async (item) => {
            try {
                delete item._id;
                const newItem = new Model(item);
                await newItem.save();
                console.log(newItem);
                return newItem;
            } catch (error) {
                return error;
            }
        })
    );
}
