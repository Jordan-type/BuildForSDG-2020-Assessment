/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable radix */
/* eslint-disable no-const-assign */
/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const $q = document.querySelector.bind(document);
const $qa = document.querySelectorAll.bind(document);

const covid19ImpactEstimator = (data) => {
  // Destructuring the given data
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  } = data;
    // Destructuring the region of the given data
  const {
    name,
    // eslint-disable-next-line no-unused-vars
    avgAge,
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
  } = region;

  const impact = {
    currentlyInfected: 0,
    infectionsByRequestedTime: 0,
    severeCasesByRequestedTime: 0,
    hospitalBedsByRequestedTime: 0,
    casesForICUByRequestedTime: 0,
    casesForVentilatorsByRequestedTime: 0,
    dollarsInFlight: 0
  };
  const severeImpact = {
    currentlyInfected: 0,
    infectionsByRequestedTime: 0,
    severeCasesByRequestedTime: 0,
    hospitalBedsByRequestedTime: 0,
    casesForICUByRequestedTime: 0,
    casesForVentilatorsByRequestedTime: 0,
    dollarsInFlight: 0
  };

  //  normalizing days to chech weeks and months
  switch (periodType) {
    case 'weeks':
      timeToElapse *= 7;
      break;
    case 'months':
      timeToElapse *= 30;
  }
  // where factor is 10 for a 30 day duration(there are 10 sets of 3 days in a perioid of 30 days)
  const timeFactor = (currentlyInfected) => {
    const power = parseInt(timeToElapse / 3);
    return currentlyInfected * (2 ** power);
  };
  // calculate AvailableBeds ByRequestedTime
  const availableBeds = (severeCasesByRequestedTime) => {
    // assuming that totalhospitalbeds available = 23 - 100%
    // occupied = 65% * 23/100 which is  14.95 beds  ***discard decimal***
    // 100 - 65 = 35 beds availabele 23/100 * 35% = 8.1 beds ***discard decimal***
    const bedsAvailable = totalHospitalBeds * 0.35;
    const shortage = bedsAvailable - severeCasesByRequestedTime;
    const result = shortage < 0 ? shortage : bedsAvailable;
    return parseInt(result);
  };
  // challenge one //  can be modified to func estimateCurrentlyInfected {} & const estimateProjectedInfction {}
  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;
  impact.infectionsByRequestedTime = timeFactor(impact.currentlyInfected);
  severeImpact.infectionsByRequestedTime = timeFactor(impact.currentlyInfected);
  // challenge two //  can be modified to func  const estimatedServereCases {} & const estimatedBedSpaceAvailablility {}
  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15; // 15%
  severeImpact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  impact.hospitalBedsByRequestedTime = availableBeds(impact.severeCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = availableBeds(severeImpact.severeCasesByRequestedTime);
  // challenge three //  can be modified to func estimatedCasesForICU {} & const estimatedCasesForVentilators & estimateddollarsInFlight
  impact.casesForICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;
  impact.casesForVentilatorsByRequestedTime = impact.infectionsByRequestedTime * 0.02;
  impact.dollarsInFlight = impact.infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD * timeToElapse;

  severeImpact.casesForICUByRequestedTime = severeImpact.infectionsByRequestedTime * 0.05;
  severeImpact.casesForVentilatorsByRequestedTime = severeImpact.infectionsByRequestedTime * 0.02;
  severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD * timeToElapse;
  // the input data inputed  // your best  case  estimation output // your severe case estimation output
  return {
    data,
    impact,
    severeImpact
  };
};

// export default covid19ImpactEstimator;
