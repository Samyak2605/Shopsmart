const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Create a Product
router.post('/', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = await prisma.product.create({
      data: { name, description, price },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Read all Products
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Read single Product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Update a Product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, description, price },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete a Product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
