const Joi = require('joi');
const express = require('express');
const app = express();
const courses = [
    { id: 1, courseName: 'python' },
    { id: 2, courseName: 'java' },
    { id: 3, courseName: 'C And C++' },
];

app.use(express.json());


// get request
app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:courseId', (req, res) => {
    const course = courses.find(i => i.id === parseInt(req.params.courseId));

    if (!course) res.status(404).send('The course with the given Id not found ');
    res.send(course);
})

app.get('/api/courses/:coursesID/:coursesName', (req, res) => {
    res.send(req.params);
});

// validate Schema
const schema = Joi.object({
    courseName: Joi.string().min(2).required(),
});

// post request
app.post('/api/courses', (req, res) => {

    const { error, value } = schema.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        courseName: req?.body?.courseName,
    };
    courses.push(course);
    res.send({ course, courses });
    console.log(courses);
});

// put request 
app.put('/api/courses/:courseId', (req, res) => {

    const course = courses.find(i => i.id === parseInt(req.params.courseId));

    if (!course) res.status(404).send('The course with the given Id not found');

    const { error, value } = schema.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.courseName = req.body.courseName;
    res.send(course);

});


// delete 
app.delete('/api/courses/:coursesId', (req, res) => {
    console.log(req.params);
    const course = courses.find(i => i.id === parseInt(req.params.coursesId));

    if (!course) return res.status(404).send('The course with the given Id not found');

    courses.splice(course, 1);
    res.send(courses)
});




const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`port ${port} is listen`));