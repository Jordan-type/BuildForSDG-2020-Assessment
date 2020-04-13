/* eslint-disable linebreak-style */
/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const covid19ImpactEstimator = (data) => {
  // Destructuring the given data
  const {
    region: {
      avgDailyIncomeInUSD,
      avgDailyIncomePopulation
    },
    periodType,
    reportedCases,
    totalHospitalBeds
  } = data;
  const {
    timeToElapse
  } = data;

  if (periodType === 'months') timeToElapse = Math.trunc(timeToElapse * 30);
  else if (periodType === 'weeks') timeToElapse = Math.trunc(timeToElapse * 7);
  else timeToElapse = Math.trunc(timeToElapse * 1);

  const timeFactor = (currentlyInfected) => {
    const factor = Math.trunc(timeToElapse / 3);
    return currentlyInfected * 2 ** factor;
  };

  const impact = {};

  // challenge 1
  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = timeFactor(
    impact.currentlyInfected
  );

  const severeImpact = {};
  // challenge 1
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = calculateInfectionsByRequestedTime(
    severeImpact.currentlyInfected
  );

  return {
    data,
    impact,
    severeImpact
  };
};
