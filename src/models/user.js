import { ApolloError } from "apollo-server";
import bcryptjs from "bcryptjs";
import { cpf } from "cpf-cnpj-validator";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import mongodb from "../libs/mongodb.js";
import { nanoid } from "nanoid";

const login = async (args) => {
    const userData = await mongodb.findOne({
        collection: "users",
        filter: {
            $or: [
                {
                    "identifiers.cpf": args.user
                },
                {
                    "identifiers.registration": args.user
                }
            ]
        }
    });

    const result = await bcryptjs.compare(args.password, userData.password);


    if (!result) {
        throw new ApolloError("Invalid!");
    }

    return { token: userData.token, type: userData.type };
};

const getUser = async (args) => {
    return await mongodb.findOne({
        collection: "users",
        filter: {
            $or: [
                {
                    "identifiers.cpf": args.user
                },
                {
                    "identifiers.registration": args.user
                }
            ]
        }
    })
};

const storeUser = async (args) => {
    const userData = await mongodb.findOne({
        collection: "users",
        filter: {
            $or: [
                {
                    "identifiers.cpf": args.user
                },
                {
                    "identifiers.registration": args.user
                }
            ]
        },
        nullable: true
    });

    if (userData) {
        throw new ApolloError('User exist!');
    }

    const encryptedPassword = await bcryptjs.hash(args.password, 10);

    const newUser = {
        createdAt: dayjs().toDate(),
        identifiers: {
            cpf: cpf.isValid(args.user) ? args.user : '',
            registration: cpf.isValid(args.user) ? '' : args.user
        },
        label: nanoid(10),
        password: encryptedPassword,
        type: 'default'
    };

    const token = jwt.sign(
        { user: newUser.label },
        "UNSAFE_STRING",
        { expiresIn: "4h" }
    );

    newUser.token = token;

    await mongodb.insertOne({
        collection: "users",
        data: newUser
    });

    return { token };
};

export default {
    login,
    getUser,
    storeUser
};