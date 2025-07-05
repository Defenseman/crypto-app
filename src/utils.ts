export const percentDiffernce = (a: number, b: number): number => {
    // return (
    //     +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)
    // )
    return +((((b / a) * 100) - 100)).toFixed(2)
}

export const capitalaze = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.substring(1);
}