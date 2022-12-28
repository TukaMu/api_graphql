import _ from "lodash";
import dayjs from "dayjs";
import mongodb from "../libs/mongodb.js";
import { nanoid } from "nanoid";

// {
//     authType: "",
//     coordinates:{
//         lat: 0,
//         lng: 0
//     },
//     password: "",
//     name: "",
//     comment: ""
// }

const dashBoard = async (args) => {
    await mongodb.findOne({
        collection: "users",
        filter: {
            token: args.token,
            type: 'root'
        }
    });

    const allReports = await mongodb.find({
        collection: "reports"
    });

    const beginWeek = dayjs().subtract(dayjs().format('d'), 'day');

    const response = {
        totalReports: allReports.length,
        reports: allReports,
        data: {
            password: {
                yes: 0,
                no: 0
            },
            reportsWeek: {
                yes: 0,
                no: 0
            },
            pendingStatus: {
                yes: 0,
                no: 0
            }
        }
    };

    _.each(allReports, (report) => {
        if (dayjs(report.createdAt).isAfter(beginWeek)) {
            response.data.reportsWeek.yes++;
        } else {
            response.data.reportsWeek.no++;
        }

        if (report.password) {
            response.data.password.yes++;
        } else {
            response.data.password.no++;
        }

        if (report.status === "pending") {
            response.data.pendingStatus.yes++;
        } else {
            response.data.pendingStatus.no++;
        }
    })

    return response;
};

const storeReport = async (args) => {
    const newReport = {
        authType: args.authType,
        coordinates: args.coordinates,
        password: args.password,
        name: args.name,
        comment: args.comment,
        createdAt: dayjs().toDate(),
        label: nanoid(10),
        status: 'pending'
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
    dashBoard,
    storeReport
};