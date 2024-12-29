const express = require('express')
const router = express.Router()
const movies = require('../movies')


let nextId = 1;


// /movies
router.get('/', (req, res) => {
    try {
        res.status(200).json(movies)
    } catch (error) {
        res.status(404).json({ error: error.message })

    }
})

// /movies/id

router.get('/:id', (req, res) => {
    try {
        const movieID = parseInt(req.params.id)
        const movie = movies.find(movie => movie.id === movieID)
        if (!movie) {
            return res.status(404).json({ error:`Movie not found` });
        }
        res.status(200).json(movie);

    } catch (error) {
        res.status(404).json({ error: error.message })


    }
})
// create
router.post('/', (req, res) => {
    try {

        const { title, genre, releaseYear, rating } = req.body;
        if (!title || !genre || !releaseYear || !rating) {
            return res.status(400).json({ error: 'All fields are required: title, genre, releaseYear, and rating.' })
        }
        const getMaxId = () => {
            return movies.reduce((max, movie) => (movie.id > max ? movie.id : max), 0);
        };
        nextId = getMaxId() + 1;

        const newMovie = {
            id: nextId,
            title,
            genre,
            releaseYear,
            rating
        };
        movies.push(newMovie);
        res.status(201).json(newMovie);


    } catch (eror) {
        res.status(500).json({ error: 'internal error' });

    }
})

// update

router.patch('/:id', (req, res) => {
    try {
        const movieID = parseInt(req.params.id)
        const movie = movies.find(movie => movie.id === movieID)
        if (!movie)
            return res.status(404).send("Movie not found");
        if (!req.body.rating)
            return res.status(400).send("Rating is required");
        movie.rating = req.body.rating;
        res.status(201).json(movie);


    } catch (error) {
        res.status(500).json({ error: 'internal error' });

    }
})
//delete
router.delete('/:id',(req,res)=>{
try {
    const movieID = parseInt(req.params.id)
    const movieIndex = movies.findIndex(movie => movie.id === movieID)

    if (movieIndex === -1) 
        return res.status(404).send("Movie not found");
    const deletedMovie = movies.splice(movieIndex,1)
    res.status(201).json(deletedMovie[0])

} catch (error) {
    res.status(500).json({ error: 'internal error' });

}
})



module.exports = router