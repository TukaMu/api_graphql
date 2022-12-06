import dayjs from "dayjs";
import mongodb from "../libs/mongodb.js";
import { nanoid } from "nanoid";

// {
//     coordinates:{
//         lat: 0,
//         lng: 0
//     },
//     password: "",
//     name: "",
//     comment: ""
// }

const storeReport = async (args) => {
    const newReport = {
        coordinates: args.coordinates,
        password: args.password,
        name: args.name,
        comment: args.comment,
        createdAt: dayjs().toDate(),
        label: nanoid(10)
    };

    await mongodb.findOne({
        collection: "users",
        filter: {
            token: args.token
        }
    });

    const response = await mongodb.insertOne({
        collection: "reports",
        data: newReport
    });

    return response ? true : false;
};

export default {
    storeReport
};