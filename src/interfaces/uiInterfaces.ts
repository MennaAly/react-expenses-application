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