export interface IDate {
    'Year' : string,
    'Month': string,
    'Day': string
}

export interface ITimeUnitValues {
    'Year': string[],
    'Month' : {
        [key: string]: number
    }, 
    'Day' : number[]
}

export interface FormInputProps {
    label: string;
    inputType: string;
    value: string;
    actionFn: (value: string) => void;
}