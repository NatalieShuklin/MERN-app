import express from "express";
import { Book } from "../models/bookModel.js";


const router = express.Router();

//save book route 
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title || !req.body.author || !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'send all required fields'
            });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
});


router.get('/', async (req, res) => {
    try {

        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
});

//by id
router.get('/:id', async (req, res) => {
    try {

        const id = req.params.id;


        const book = await Book.findById(id).populate('history');
        return res.status(200).json(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
});


//route for update a book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const { id } = request.params;

        const result = await Book.findById(id);
        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        const { title, author, publishYear } = request.body;

        result.history.push({
            title: result.title,
            author: result.author,
            publishYear: result.publishYear,
        });
        result.title = title;
        result.author = author;
        result.publishYear = publishYear;

        await result.save();

        return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//delete
router.delete('/:id', async (req, res) => {
    try {

        const id = req.params.id;

        const book = await Book.findByIdAndDelete(id);
        if (!res) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        return res.status(200).send({
            message: 'Book deleted '
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
});


export default router;