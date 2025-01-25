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
    const userData = await mongodb.getdataBase().db().collection('users').findOne({ _id: userId });
    if (userData) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(userData);
    } else {
        res.status(404).json({ error: 'User  not found' });
    }
}

const createUser = async (req, res) => {
    const users = {
        firstName: req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        birthday : req.body.birthday,
    }
    const response = await mongodb.getdataBase().db().collection('users').insertOne(users);
    if(response.acknowledged){
        res.status(201).send();
    }else{
        res.status(500).json(response.error || 'Error creating user');
    }
};


const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        birthday : req.body.birthday
    }
    const response = await mongodb.getdataBase().db().collection('users').replaceOne({ _id: userId},user)
    if(response.modifiedCount > 0){
        res.status(200).send();
    }else{
        res.status(500).json(response.error || 'Error updating user');
    }
}

const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getdataBase().db().collection('users').deleteOne({ _id:userId});
    if(response.deletedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Error deleting user');
    }
}

module.exports = {getAllUsers, getSingleUsers, createUser, updateUser, deleteUser};