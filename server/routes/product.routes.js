const express = require("express");
const Product = require("../models/Product");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router
    .route("/")
    .get(async (req, res) => {
        try {
            const list = await Product.find();
            res.status(200).send(list);
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже."
            });
        }
    })
    .post(auth, async (req, res) => {
        try {
            const newProduct = await Product.create(req.body);
            res.status(201).send(newProduct);
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже."
            });
        }
    });

router
    .route("/:productId")
    .get(async (req, res) => {
        try {
            const { productId } = req.params;
            const list = await Product.findById(productId);
            res.status(200).send(list);
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже."
            });
        }
    })
    .patch(auth, async (req, res) => {
        try {
            const { productId } = req.params;
            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                req.body,
                { new: true }
            );
            res.send(updatedProduct);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже."
            });
        }
    })
    .delete(auth, async (req, res) => {
        try {
            const { productId } = req.params;
            const removedProduct = await Product.findById(productId);
            await removedProduct.remove();

            res.send(null);
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже."
            });
        }
    });

module.exports = router;
