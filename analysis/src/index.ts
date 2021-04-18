import earthData from './data/earthData.json';
interface CropInformation {
    type: string;
    name: string;
    earthScore: number;
    state: Season;
    image: string;
    summary: string;
    environmentalImpact: string;
    costPerAcre: number;
    verdict: string;
    daysToGrow: number;
    waterUsed: number;
    lbsPerAcre: number;
    valuePerAcre: number;
}

const dataForCrop = (crop: string): CropInformation => {
    return earthData.find(candidate => {
        candidate.name === crop;
    }) as CropInformation;
};

/**
Array
   0    1      2    3
Spring Summer Fall Winter 
 */
interface CropAmount {
    crop: string;
    acre: number; // in acres (remember to convert)
}

enum Season {
    Spring = 'Spring',
    Summer = 'Summer',
    Fall = 'Fall',
    Winter = 'Winter',
}

const SeasonToIdx = (season: Season): number => {
    switch (season) {
        case Season.Spring: return 0
        case Season.Summer: return 1
        case Season.Fall: return 2
        case Season.Winter: return 3
    }
}

enum Month {
    January = 0,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December,
}

const monthToSeason = (month: Month) => {
    if (month < 3) {
        return Season.Winter;
    } else if (month < 6) {
        return Season.Spring;
    } else if (month < 9) {
        return Season.Summer;
    } else {
        return Season.Fall;
    }
};

const seasonToMonth = (season: Season) => {
    switch (season) {
        case Season.Spring:
            return Month.January;
        case Season.Summer:
            return Month.April;
        case Season.Fall:
            return Month.August;
        case Season.Winter:
            return Month.October;
    }
};

const cleanMonth = (month: number): Month => {
    // somehow normalize month to be within 0 and 11
    return (month + 12) % 12;
}

const sqftToAcre = (sqft: number) => {
     // https://www.thecalculatorsite.com/conversions/area/square-feet-to-acres.php
    return 0.000022956841138659 * sqft;
};

interface WaterUsageAndYieldOutput {
    waterUsage: number[];
    yield: number[];
}

const determineWaterUsageAndYield = (array: CropAmount[]): WaterUsageAndYieldOutput => {
    const output: WaterUsageAndYieldOutput = {
        waterUsage: [0,0,0,0],
        yield: [0,0,0,0],
    };

    for (const item of array) {
        const cropData = dataForCrop(item.crop);
        const season = cropData.state;
        const endMonth = seasonToMonth(season);
        const numOfMonths = cropData.daysToGrow / 30;
        const startMonth = cleanMonth(endMonth - numOfMonths);

        for (let j = 0; j < numOfMonths; j++) {
            const month = cleanMonth(startMonth + j);
            const season = monthToSeason(month);
            const idx = SeasonToIdx(season);

            output.waterUsage[idx] += cropData.waterUsed * 91.25;
        }
        output.yield[SeasonToIdx(season)] += cropData.lbsPerAcre * item.acre;
    }
    return output;
};

interface SpendingAndRevenueOutput {
    spending: number[];
    revenue: number[];
}

const determineSpendingAndRevenue = (array: CropAmount[]): SpendingAndRevenueOutput => {
    const output: SpendingAndRevenueOutput = {
        spending: [],
        revenue: [],
    };

    for (const item of array) {
        const cropData = dataForCrop(item.crop);
        const season = cropData.state;
        const endMonth = seasonToMonth(season);
        const numOfMonths = cropData.daysToGrow / 30;
        const startMonth = cleanMonth(endMonth - numOfMonths);

        for (let j = 0; j < numOfMonths; j++) {
            const month = cleanMonth(startMonth + j);
            const season = monthToSeason(month);
            const idx = SeasonToIdx(season);

            const cost = cropData.costPerAcre * item.acre;
            const revenue = cropData.valuePerAcre * item.acre;
            output.spending[idx] += cost;
            output.revenue[idx] = revenue;
        }
    }
    
    return output;
};
