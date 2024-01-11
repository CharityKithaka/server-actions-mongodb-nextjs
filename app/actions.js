"use server"

import { MongoClient } from "mongodb"

// export default function MongoServerComponent() {
async function connectToDb() {
    try {
        const uri = process.env.MONGODB_URI;
        const client = await MongoClient.connect(uri);
        const db = client.db('charity');
        return db;
    } catch (e) {
        throw e;
    }
}

// add user (email, name) to db
export async function addUser(email, name) {
    try {
        const db = await connectToDb();
        const collection = db.collection('users');
        const user = { email, name };
        const result = await collection.insertOne(user);
        return result;
    } catch (e) {
        throw e;
    }
}

// fetch all users from db
export async function fetchUsers() {
    try {
        const db = await connectToDb();
        const collection = db.collection('users');
        const result = await collection.find({}).toArray();
        return result;
    } catch (e) {
        throw e;
    }
}