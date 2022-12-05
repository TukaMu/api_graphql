import { ApolloError } from 'apollo-server';
import { MongoClient } from 'mongodb';
import _ from "lodash";

const client = new MongoClient('link');

const collection = async (collection) => {
    await client.connect();

    return client.db('database').collection(collection);
};

const count = async (args) => {
    const cl = await collection(args.collection);
    const count = await cl.countDocuments(args.filter || {}, args.options || {});

    return { count };
};

const deleteOne = async (args) => {
    const cl = await collection(args.collection);
    const { value: response } = await cl.findOneAndDelete(args.filter, args.options || {});

    if (!response) {
        if (args.nullable) {
            return null;
        }

        throw new ApolloError(404);
    }

    return response;
};

const findOne = async (args) => {
    const cl = await collection(args.collection);
    const { value: response } = await cl.findOne(args.filter, args.options || {});

    if (!response) {
        if (args.nullable) {
            return null;
        }

        throw new ApolloError(404);
    }

    return response;
};

const find = async (args) => {
    const cl = await collection(args.collection);
    const { value: response } = await cl.find(args.filter, args.options || {}).toArray();

    return response;
};

const insertOne = async (args) => {
    const cl = await collection(args.collection);
    await cl.insertOne(args.data, args.options || {});

    return args.data;
};

const updateOne = async (args) => {
    const cl = await collection(args.collection);

    args.options = _.defaults({}, args.options, {
        returnDocument: ReturnDocument.AFTER,
        upsert: false
    });

    const isAtomic = _.some(args.data, (value, key) => {
        return key.startsWith('$');
    });

    const { value: response, lastApolloErrorObject } = await cl.findOneAndUpdate(
        args.filter,
        isAtomic
            ? args.data
            : {
                $set: args.data
            },
        args.options || {}
    );

    if (!lastApolloErrorObject?.updatedExisting) {
        throw new ApolloError(404);
    }

    return response;
};

export default {
    count,
    deleteOne,
    find,
    findOne,
    insertOne,
    updateOne
};