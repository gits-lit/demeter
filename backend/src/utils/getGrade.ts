
enum Grade {
    "F" = 0,
    "D",
    "D+",
    "C",
    "C+",
    "B",
    "B+",
    "A",
    "A+"
}

export const numToGrade = (score: number): Grade => {
    return Math.round(score);
}

export const getGrade = (moisture: number,temp: number): number  => {
    const weights = [0.1,0.9];
    const moistureScore = 1 - Math.abs(40 - moisture)/40;
    const tempScore = 1 - Math.abs(70 - temp)/70;
    return (moistureScore*weights[0] + tempScore*weights[1]) * 9;
}