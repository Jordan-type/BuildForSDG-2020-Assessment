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
  let {
    timeToElapse
  } = data;

  // Custom Functions and Variables

  // normalize days; check for weeks and months if used
  if (periodType === 'months') timeToElapse = Math.trunc(timeToElapse * 30);
  else if (periodType === 'weeks') timeToElapse = Math.trunc(timeToElapse * 7);
  else timeToElapse = Math.trunc(timeToElapse * 1);

  // calculate InfectionsByRequestedTime
  const calculateInfectionsByRequestedTime = (currentlyInfected) => {
    const factor = Math.trunc(timeToElapse / 3);
    return currentlyInfected * 2 ** factor;
  };
  // calculate AvailableBeds
  const calculateAvailableBeds = (severeCasesByRequestedTime) => {
    const bedsAvailable = totalHospitalBeds * 0.35;
    const shortage = bedsAvailable - severeCasesByRequestedTime;
    const result = shortage < 0 ? shortage : bedsAvailable;
    return Math.trunc(result);
  };

  // calculate dollarsInFlight
  const calculateDollarsInFlight = (infectionsByRequestedTime) => {
    const infections = infectionsByRequestedTime
      * avgDailyIncomeInUSD
      * avgDailyIncomePopulation;
    const result = infections / timeToElapse;
    return Math.trunc(result);
  };

  // the best case estimation
  const impact = {};
  // challenge 1
  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = calculateInfectionsByRequestedTime(
    impact.currentlyInfected
  );
  // challenge 2
  impact.severeCasesByRequestedTime = Math.trunc(
    impact.infectionsByRequestedTime * 0.15
  );
  impact.hospitalBedsByRequestedTime = calculateAvailableBeds(
    impact.severeCasesByRequestedTime
  );
  // challenge 3
  impact.casesForICUByRequestedTime = Math.trunc(
    impact.infectionsByRequestedTime * 0.05
  );
  impact.casesForVentilatorsByRequestedTime = Math.trunc(
    impact.infectionsByRequestedTime * 0.02
  );
  impact.dollarsInFlight = calculateDollarsInFlight(
    impact.infectionsByRequestedTime
  );

  // the severe case estimation
  const severeImpact = {};
  // challenge 1
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = calculateInfectionsByRequestedTime(
    severeImpact.currentlyInfected
  );
  // challenge 2
  severeImpact.severeCasesByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.15
  );
  severeImpact.hospitalBedsByRequestedTime = calculateAvailableBeds(
    severeImpact.severeCasesByRequestedTime
  );
  // challenge 3
  severeImpact.casesForICUByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.05
  );
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.02
  );
  severeImpact.dollarsInFlight = calculateDollarsInFlight(severeImpact.infectionsByRequestedTime);

  return {
    data, // the input data you got
    impact, // your best case estimation
    severeImpact // your severe case estimation
  };
};
