const express = require('express')//importing express
//import { func } from 'joi';
const app = express();//initializing apps
const Joi = require('joi')// initializing joi

const port = process.env.PORT || 3000;  // listen on that port
app.listen(port, ()=> console.log(`listening on port ${port}`));// testing if port works 

// Mock data to use 
const genres = [{id: 1, name: 'Action'},
{id: 2, name: 'love'},
{id: 3, name: 'Drama'}

];
// custom middleware 
app.use(express.json());

app.get('/api/genres/', (req, res)=>{
    res.send(genres);
});


//get method, to fetch all the data for movies 
app.get('/api/genres/:id', (req, res)=>{
    const genre = genres.find(c=> c.id === parseInt(req.params.body));
    if (!genre) return res.status(404).send("A movie with the given ID was not found");
    
    res.send(genres)

});


//Post method to, to add a movie to the genres 
app.post('api/genres/', (req, res)=>{
const {error } = validateGenre(req.body)//validating the user input 
if (error) return res.status(400).send(error.details[0].message)//send error message to user if error comes by
    const genre = {
        id: genres.length+1,
        name: req.body.name
    };
genres.push(genre)
res.send(genre)
    
});

app.put('/api/genres/:id', (req,res)=>{
    const genre = genres.find(c=> c.id === parseInt(re.params.id));
    if(!genre) return res.status(404).send("The movie with that id was not found");

    const {error} = validateGenre(req.body);// validate the update using joi
    if (error) res.status(400).send(error.details[0].message);// if error exists send message to client
    genre.name = req.body.name;//
    res.send(genre);// send movie genre to the user

});

app.delete('/api/genres/:id', (req, res)=>{
    const genre = genres.find(c=> c.id === req.params.body)
    if (!genre) return res.status(500).send("a genre by that ID does not exist");

    const del = genres.indexOf(genres);
    genres.splice(del, 1);
});
























function validateGenre(genre){
    const schema = {
        name: Joi.string().min(5).required()
    };
    return Joi.Validate(genre, schema)
};