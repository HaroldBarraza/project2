const { body, validationResult } = require('express-validator');
const {response} = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllClasses = async(req, res) =>{
    try {
        const result = await mongodb.getdataBase().db().collection('classes').find();
        result.toArray().then((classes) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(classes);
        })
    }catch (error) {
        res.status(500).json({message: 'Error al obtener las clases'});
    }
}

const getSingleClasses = async(req, res) => {
    const classId = new ObjectId(req.params.id);
    try{
        const classData = await mongodb.getdataBase().db().collection('classes').findOne({ _id: classId });
        if (classData) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(classData);
        } else {
            res.status(404).json({ error: 'Class not found' });
        }
    }catch{
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createClass = [
    body('name').notEmpty().withMessage('Class name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('date').notEmpty().withMessage('Valid date is required'),
    body('duration').notEmpty().withMessage('Duration is required'),
    body('teacher').notEmpty().withMessage('Teacher name is required'),

    async (req, res) =>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
        const classData = {
            name : req.body.name,
            description : req.body.description,
            date : req.body.date,
            duration : req.body.duration,
            teacher : req.body.teacher,
            enrolledStudents : req.body.enrolledStudents || [],
            createdBy : req.body.createdBy
            };
            try{
                const result = await mongodb.getdataBase().db().collection('classes').insertOne(classData);
                if (result.acknowledged){
                    res.status(201).json({id : response.insertId})
                }else{
                    res.status(500).json({ error : 'Failed to create class' })
                }
            }catch (error){
                res.status(500).json({ error : 'Internal Server Error' })
            }
        }
];
const updateClass = async (req, res) => {
    console.log('Middleware de autenticación pasó'); // Para depuración
    console.log('User  session in createClass:', req.session.user);
    console.log('Middleware de autenticación pasó');
    const classId = new ObjectId(req.params.id);
    const classData = {
        name : req.body.name,
        description : req.body.description,
        date : req.body.date,
        duration : req.body.duration,
        teacher : req.body.teacher,
        enrolledStudents : req.body.enrolledStudents || [],
        createdBy : req.body.createdBy
    };
    try{
        const response = await mongodb.getdataBase().db().collection('classes').replaceOne({ _id :classId }, classData);
        if (response.modifiedCount > 0){
            res.status(204).send();
        }else{
            res.status(500).json(response.error || 'Error updating class' )
        }
    }catch(error){
        res.status(500).json({ error : 'Internal Server Error' })
    }
}
const deleteClass = async (req, res) => {
    const classId = new ObjectId(req.params.id);
    try{
        const response = await mongodb.getdataBase().db().collection('classes').deleteOne({ _id:classId });
        if(response.deleteCount > 0){
            res.status(204).send();
        }else{
            res.status(500).json(response.error || 'Error deleting class')
        }
    }catch(error){
        res.status(500).json({ error : 'Internal Server Error' })
    }
}

module.exports = {getAllClasses, getSingleClasses, createClass, updateClass, deleteClass}