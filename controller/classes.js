const {response} = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllClasses = async(req, res) =>{
    const result = await mongodb.getdataBase().db().collection('classes').find();
    result.toArray().then((classes) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(classes);
    })
}

const getSingleClasses = async(req, res) => {
    const classId = new ObjectId(req.params.id);
    const classData = await mongodb.getdataBase().db().collection('classes').findOne({ _id: classId });
    if (classData) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(classData);
    } else {
        res.status(404).json({ error: 'Class not found' });
    }
}

const createClass = async (req, res) => {
    const classData = {
        name : req.body.name,
        description : req.body.description,
        date : req.body.date,
        duration : req.body.duration,
        teacher : req.body.teacher,
        enrolledStudents : req.body.enrolledStudents || [],
        createdBy : req.body.createdBy
        };
        const result = await mongodb.getdataBase().db().collection('classes').insertOne(classData);
        if (result.acknowledged){
            res.status(201).json({id : response.insertId})
        }else{
            res.status(500).json({ error : 'Failed to create class' })
        }
};
const updateClass = async (req, res) => {
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
    const response = await mongodb.getdataBase().db().collection('classes').replaceOne({ _id :classId }, classData);
    if (response.modifiedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(result.error || 'Error updating class' )
    }
}
const deleteClass = async (req, res) => {
    const classId = new ObjectId(req.params.id);
    const response = await mongodb.getdataBase().db().collection('classes').deleteOne({ _id:classId });
    if(response.deleteCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(result.error || 'Error deleting class')
    }
}

module.exports = {getAllClasses, getSingleClasses, createClass, updateClass, deleteClass}