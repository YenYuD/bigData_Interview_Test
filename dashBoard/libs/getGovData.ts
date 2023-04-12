import axios from "axios";
import jsonp from "./jsonP";

const corsURL = "https://cors-anywhere.herokuapp.com/"; // use cors-anywhere to fetch api data

export default async function GetPopulation(
    year: string = "110",
    county: string,
    district: string
) {
    let url = `https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/${year}?COUNTY=${county}&TOWN=${district}`;

    const result = await axios.get(
        jsonp(url, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "*/*",
                "Access-Control-Allow-Origin": "*",
            },
        })
    );

    if (result.status === 200) {
        const data = result.data.responseData;

        const keys = [
            "household_ordinary_m",
            "household_ordinary_f",
            "household_single_m",
            "household_single_f",
        ];
        const columndataObj = data.reduce((acc: any, cur: any) => {
            keys.forEach((key) => {
                if (!acc.hasOwnProperty(key)) {
                    acc[key] = 0;
                }
                acc[key] += parseInt(cur[key]);
            });
            return acc;
        }, Object.fromEntries(keys.map((key) => [key, 0])));

        const pieDataObj = {
            household_ordinary_total: 0,
            household_single_total: 0,
        };

        data.forEach((item: any) => {
            pieDataObj.household_ordinary_total += parseInt(
                item.household_ordinary_total
            );
            pieDataObj.household_single_total += parseInt(
                item.household_single_total
            );
        });

        return { pieDataObj, columndataObj };
    } else {
        throw new Error("something wrong with data");
    }
}
