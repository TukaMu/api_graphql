import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import mongodb from "../libs/mongodb.js";

const getUser = async (args) => {
    return await mongodb.findOne({
        collection: "users",
        filter: {
            identifiers: {
                $or: [
                    {
                        cpf: args.user
                    },
                    {
                        registration: args.user
                    }
                ]
            }
        }
    })
};

const storeUser = async (args) => {
    await mongodb.findOne({
        collection: "users",
        filter: {
            identifiers: {
                $or: [
                    {
                        cpf: args.user
                    },
                    {
                        registration: args.user
                    }
                ]
            }
        }
    });

    const encryptedPassword = await bcryptjs.hash(args.password, 10);

    //inset valid cpf

    const newUser = {
        identifiers: {
            cpf: '',
            registration: ''
        },
        label: nanoid(10),
        password: encryptedPassword
    };

    const token = jwt.sign(
        { user: newUser.label },
        "UNSAFE_STRING",
        { expiresIn: "4h" }
    );

    newUser.token = token;

    await Promise.all([
        mongodb.insertOne({
            collection: "users",
            data: newUser
        }),
        mongodb.insertOne({
            collection: "authenticatedNow",
            data: {
                user: newUser.label,
                token: newUser.token
            }
        })
    ]);
};

export default {
    storeUser
};