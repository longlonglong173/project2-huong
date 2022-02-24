const express = require('express');
const router = express.Router();
const path = require('path');
// const IdList = require(path.resolve('models/IdList.js'));
const Tour = require(path.resolve('models/Tour.js'));
const DatVe = require(path.resolve('models/DatVe.js'));
const { tourForm, formDatVe } = require(path.resolve('modules/mixin.js'));

// 1. phần trăm
// 2. tour nào
//

const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
        );
        return result;
    }, {});
    // return array.reduce((obj, item) => {
    //     obj[item[key]] = item;
    //     return obj;
    // }, {});
};

const groupByLocation = (array) => {
    return array.reduce((result, currentValue) => {
        (result[currentValue.tour.diaDiem] =
            result[currentValue.tour.diaDiem] || []).push(currentValue);
        return result;
    }, {});
};

const groupByMonth = (array) => {
    let result = {
        0: [],
        1: [],
        2: [],
        3: [],
    };
    result = {
        ...result,
        ...array.reduce((result, currentValue) => {
            const month = new Date(currentValue.tour.ngayKhoiHanh).getMonth();
            let index = 0;
            if (month < 3) {
                index = 0;
            } else if (month <= 3 && month < 6) {
                index = 1;
            } else if (month <= 6 && month < 9) {
                index = 2;
            } else {
                index = 3;
            }
            (result[index] = result[index] || []).push(currentValue);
            return result;
        }, {}),
    };
    return result;
};

router.get('/', async (req, res) => {
    try {
        //
        const listTour = await Tour.find();
        const listVe = await DatVe.find();
        let listFormDatVe = [];
        listVe.forEach((ve) => {
            const tour = listTour.find((t) => t.ma == ve.maTour);
            listFormDatVe.push(formDatVe(ve, tour));
        });

        //
        const byTourId = groupBy(listVe, 'maTour');
        const listTourId = Object.keys(byTourId);
        const byTourIdResult = [];
        for (let i = 0; i < listTourId.length; i++) {
            const tourData = listTour.find((d) => d.ma == listTourId[i]);
            if (tourData) {
                byTourIdResult.push({
                    tour: tourData,
                    count: byTourId[listTourId[i]].length,
                });
            }
        }
        //
        const byLocation = groupByLocation(listFormDatVe);
        const listTourLocation = Object.keys(byLocation);
        const byTourLocationResult = [];
        for (let i = 0; i < listTourLocation.length; i++) {
            if (listTourLocation[i] != undefined) {
                const tourData = listTour.find(
                    (d) => d.diaDiem == listTourLocation[i]
                );
                if (tourData) {
                    byTourLocationResult.push({
                        tour: tourData,
                        count: byLocation[listTourLocation[i]].length,
                    });
                }
            }
        }
        //
        const byMonth = groupByMonth(listFormDatVe);
        const byMonthResult = {
            0: {
                count: byMonth['0'].length,
            },
            1: {
                count: byMonth['1'].length,
            },
            2: {
                count: byMonth['2'].length,
            },
            3: {
                count: byMonth['3'].length,
            },
        };

        //
        return res.status(200).json({
            data: {
                byId: { data: byTourIdResult, totalTicket: listVe.length },
                byLocation: {
                    data: byTourLocationResult,
                    totalTicket: listVe.length,
                },
                byMonth: {
                    data: byMonthResult,
                    totalTicket: listVe.length,
                },
            },
            success: true,
        });
    } catch {
        return res.status(400).json({
            success: false,
        });
    }
});

module.exports = router;
