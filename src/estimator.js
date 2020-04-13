/* eslint-disable linebreak-style */
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
      avgDailyIncomePopulation,
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

  // infections by time passed
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** timeFactor);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** timeFactor);

  // challenge two
  const impactRequestedTime = impact.infectionsByRequestedTime * 0.15;
  const severeRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;

  impact.severeCasesByRequestedTime = Math.trunc(impactRequestedTime); // 15%
  severeImpact.severeCasesByRequestedTime = Math.trunc(severeRequestedTime); // 15%

  // compute AvailableBeds ByRequestedTime
  const bedsAvailable = totalHospitalBeds * 0.35; // assuming that totalhospitalbeds available = 23 - 100%
  const impactShortage = bedsAvailable - impactRequestedTime; // occupied = 65% * 23/100 which is  14.95 beds  ***discard decimal***
  const severeShortage = bedsAvailable - severeRequestedTime; // 100 - 65 = 35 beds availabele 23/100 * 35% = 8.1 beds ***discard decimal***


  impact.hospitalBedsByRequestedTime = Math.trunc(impactShortage);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(severeShortage);

  // challenge three
  impact.casesForICUByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.05);
  severeImpact.casesForICUByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 0.05);

  impact.casesForVentilatorsByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.02);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 0.02);

  let usdInFight;
  // const compute = population * avgDailyIncomeInUsd;

  if (periodType === 'months') {
    usdInFight = timeToElapse * 30;
  } else if (periodType === 'weeks') {
    usdInFight = timeToElapse * 7;
  } else if (periodType === 'days') {
    usdInFight = timeToElapse * 1;
  }

  const impactDollarsInFlight = (impact.InfestionsByRequestTime * avgDailyIncomeInUSD * avgDailyIncomePopulation) / usdInFight;
  const severeImpactDollarsInFlight = (severeImpact.InfestionsByRequestTime * avgDailyIncomeInUSD * avgDailyIncomePopulation) / usdInFight;

  impact.impact.dollarsInFlight = Math.trunc(impactDollarsInFlight);
  severeImpact.dollarsInFlight = Math.trunc(severeImpactDollarsInFlight);
  // impact.dollarsInFlight = Math.trunc((impact.infectionsByRequestedTime * compute) / usdInFight);
  // severeImpact.dollarsInFlight = Math.trunc((severeImpact.infectionsByRequestedTime * compute) / usdInFight);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
