/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const covid19ImpactEstimator = (data) => {
  // Destructuring the given data
  const {
    region: {
      avgDailyIncomeInUsd
    },
    reportedCases,
    timeToElapse,
    periodType,
    population,
    totalHospitalBeds
  } = data;

  const impact = {};

  const severeImpact = {};

  // challenge one
  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  // check if the timeToElapse in in days weeks or months

  let timeFactor;

  switch (periodType.trim().toLowerCase()) {
    case 'months':
      timeFactor = Math.trunc((timeToElapse * 30) / 3);
      break;
    case 'weeks':
      timeFactor = Math.trunc((timeToElapse * 7) / 3);
      break;
    case 'days':
      timeFactor = Math.trunc((timeToElapse) / 3);
      break;
    default:
  }
  // const timeFactor = (currentlyInfected) => {
  //   const factor = Math.trunc(timeToElapse / 3);
  //   return currentlyInfected * 2 ** factor;
  // };
  // infections by time passed
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** timeFactor);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** timeFactor);

  // challenge two

  impact.severeCasesByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.15); // 15%
  severeImpact.severeCasesByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.15); // 15%

  // compute AvailableBeds ByRequestedTime
  const availableBeds = (severeCasesByRequestedTime) => {
    // assuming that totalhospitalbeds available = 23 - 100%
    // occupied = 65% * 23/100 which is  14.95 beds  ***discard decimal***
    // 100 - 65 = 35 beds availabele 23/100 * 35% = 8.1 beds ***discard decimal***
    const bedsAvailable = totalHospitalBeds * 0.35;
    const shortage = bedsAvailable - severeCasesByRequestedTime;
    const result = shortage < 0 ? shortage : bedsAvailable;
    return Math.trunc(result);
  };

  impact.hospitalBedsByRequestedTime = availableBeds(impact.severeCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = availableBeds(severeImpact.severeCasesByRequestedTime);


  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
