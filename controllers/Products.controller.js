const Product = require('../models/Products.model');

module.exports = {
    create: async (req, res) => {
        const formData = req.body;
        const ProductModel = new Product(formData);
        ProductModel.save().then(data => {
            return res.status(200).json({ status: "success", result: data});
        }).catch(e => {
            res.send(400).json({ status: "error", error: e});
        });
    },
    getAll: async (req, res) => {
        await Product.find().exec()
        .then((data) => {
            if (data == null) {
                res.send('data not found');
            }
            res.status(200).send({ status: "success", result: data});
        }).catch(e => {
            res.status(400).send({ status: "error", error: e});
        });
    },
    update: async (req, res) => {
        let updateId = req.params.id;
        if (updateId) {
            await Product.findByIdAndUpdate(updateId, req.body, { new: true}).exec()
            .then(data => {
                res.status(200).send({ status: "success", result: data});
            }).catch(e => {
                res.status(400).send({ status: "error", error: e});
            });
        } else {
            res.status(400).send({ status: "error", result: "Provide an Id to update!"});
        }
    },
    delete: async (req, res) => {
        let deleteId = req.params.id;
        if (deleteId) {
            await Product.findOneAndDelete({
                _id: deleteId
            }).exec()
            .then(data => {
                res.status(200).send({ status: "success", result: data});
            }).catch(e => {
                res.status(400).send({ status: "error", error: e});
            })
        }
    }
}