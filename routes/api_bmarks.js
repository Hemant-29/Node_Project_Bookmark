const express = require('express');
const router = express.Router();
const BookmarkModel = require('../models/bookmarks')

// Get all the bookmarks
router.get('/', async (req, res) => {
    try {
        const bookmark = await BookmarkModel.find({})
        res.status(200).json(bookmark)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

// Get a particular bookmark
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        bm = await BookmarkModel.findOne({ _id: id });

        if (!bm) {
            return res.status(404).json({ msg: "Not Found" });
        }
        console.log(bm);

        res.status(200).json(bm);
    } catch (error) {
        res.status(500).json(error)
    }
})

// Add a new bookmark
router.post('/', async (req, res) => {
    try {
        const bookmark = await BookmarkModel.create(req.body);
        res.status(201).json({ bookmark })
    } catch (error) {
        res.status(500).json(error.message)
    }
})

// Update a bookmark
router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const bookmark = await BookmarkModel.updateOne(
            { _id: id },
            { link: req.body.link, name: req.body.name },
            { new: true, runValidators: true });

        res.status(200).json({ bookmark });
    } catch (error) {
        res.status(501).json(error.message);
    }
})


// Delete a bookmark
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const bookmark = await BookmarkModel.deleteOne({ _id: id });

        if (!bookmark) {
            return res.status(404).json(`No bookmark found with the id: ${id}`)
        }

        res.status(200).json(bookmark);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

module.exports = router;