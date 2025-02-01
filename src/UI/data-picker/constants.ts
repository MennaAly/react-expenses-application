import { ITimeUnitValues } from "../../interfaces/uiInterfaces";
import { timeUnit } from "./types";

export const datePickerHeaderOptions: timeUnit[] = ['Year', 'Month', 'Day'];
export const timeUnitValues: ITimeUnitValues = {
    'Year': ['2025','2024','2023','2022','2021','2020','2019','2018','2017','2016'],
    'Month': {
        "January": 31,
        "February": 28,
        "March": 31,
        "April": 30,
        "May": 31,
        "June": 30,
        "July": 31,
        "August": 31,
        "September": 30,
        "October": 31,
        "November": 30,
        "December": 31
    },
    'Day' : []
}

export const monthNumberNameMap: {[key: number]: string} = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
}
