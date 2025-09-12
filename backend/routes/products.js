const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();


const dataPath = path.join(__dirname, '../data/products.json');


const readProducts = () => {
    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};


const writeProducts = (products) => {
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
};


router.get('/', (req, res) => {
    const products = readProducts();
    res.json(products);
});

router.get('/:id', (req, res) => {
    const products = readProducts();
    const product = products.find(p => p.id === parseInt(req.params.id));

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
});


router.post('/', (req, res) => {
    const products = readProducts();
    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
        images: req.body.images || [],
        createdAt: new Date().toISOString()
    };

    products.push(newProduct);
    writeProducts(products);

    res.status(201).json(newProduct);
});


router.put('/:id', (req, res) => {
    const products = readProducts();
    const index = products.findIndex(p => p.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }


    const { id: _, createdAt: __, ...updateData } = req.body;
    products[index] = {
        ...products[index],
        ...updateData
    };

    writeProducts(products);

    res.json(products[index]);
});


router.delete('/:id', (req, res) => {
    let products = readProducts();
    const index = products.findIndex(p => p.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    products = products.filter(p => p.id !== parseInt(req.params.id));
    writeProducts(products);

    res.json({ message: 'Product deleted successfully' });
});

module.exports = router;