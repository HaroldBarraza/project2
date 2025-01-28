const { body, validationResult } = require('express-validator');
const{response} = require('express')
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
    const result = await mongodb.getdataBase().db().collection('users').find();
    result.toArray().then((users) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    })
}

const getSingleUsers = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    try{
        const userData = await mongodb.getdataBase().db().collection('users').findOne({ _id: userId });
        if (userData) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(userData);
        } else {
        res.status(404).json({ error: 'User  not found' });
        }
    }catch{
        res.status(500).json({ error: 'Error fetching user data' });
    }
}

const createUser = [
    body('firstName').notEmpty().withMessage('Firts name is require'),
    body('lastName').notEmpty().withMessage('Last name is require'),
    body('email').notEmpty().withMessage('Email is require'),
    body('birthday').notEmpty().withMessage('birthday is require'),
    
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const users = {
            firstName: req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            birthday : req.body.birthday,
        }
        try{
            const response = await mongodb.getdataBase().db().collection('users').insertOne(users);
            res.status(201).json({id: response.insertedId});
        }catch (error){
            res.status(500).json({ error: 'Failed to create user' });
        }
    }
];


const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        birthday : req.body.birthday
    }
    try{
        const response = await mongodb.getdataBase().db().collection('users').replaceOne({ _id: userId},user)
        if(response.modifiedCount > 0){
            res.status(200).send();
        }else{
            res.status(500).json(response.error || 'Error updating user');
        }
    }catch (error){
    res.status(500).json({ error: 'Failed to update user' });
    }
}

const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    try{
        const response = await mongodb.getdataBase().db().collection('users').deleteOne({ _id:userId});
        if(response.deletedCount > 0){
            res.status(204).send();
        }else{
            res.status(500).json(response.error || 'Error deleting user');
        }
    }catch(error){
        res.status(500).json({ error: 'Failed to delete user' });
    }
}

module.exports = {getAllUsers, getSingleUsers, createUser, updateUser, deleteUser};