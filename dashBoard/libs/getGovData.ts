import axios from "axios";

const corsURL = "https://cors-anywhere.herokuapp.com/"; // use cors-anywhere to fetch api data

export default async function getPopulation(
    year: string = "110",
    county: string,
    district: string
) {
    let url =
        corsURL +
        `https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${year}?COUNTY=${county}&TOWN=${district}`;

    const result = await axios.get(url, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "*/*",
            "Access-Control-Allow-Origin": "*",
        },
    });

    if (result.status === 200) {
        const data = result.data.responseData;

        const dataObj = data.reduce((acc: any, cur: any) => {
            if (!acc.hasOwnProperty("household_ordinary_m")) {
                acc["household_ordinary_m"] = 0;
            }
            if (!acc.hasOwnProperty("household_ordinary_f")) {
                acc["household_ordinary_f"] = 0;
            }
            if (!acc.hasOwnProperty("household_single_m")) {
                acc["household_single_m"] = 0;
            }
            if (!acc.hasOwnProperty("household_single_f")) {
                acc["household_single_f"] = 0;
            }

            acc["household_ordinary_m"] =
                parseInt(acc.household_ordinary_m) +
                parseInt(cur.household_ordinary_m);

            acc["household_ordinary_f"] =
                parseInt(acc.household_ordinary_f) +
                parseInt(cur.household_ordinary_f);

            acc["household_single_m"] =
                parseInt(acc.household_single_m) +
                parseInt(cur.household_single_m);

            acc["household_single_f"] =
                parseInt(acc.household_single_f) +
                parseInt(cur.household_single_f);

            return acc;
        }, {});

        return dataObj;
    } else {
        throw new Error("something wrong with data");
    }
}
