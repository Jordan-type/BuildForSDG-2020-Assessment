/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable radix */
/* eslint-disable no-const-assign */
/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
// const $q = document.querySelector.bind(document);
// const $qa = document.querySelectorAll.bind(document);
// intial data structure
/* const input = {
  region: {
    name: "Africa",
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: "days",
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
} */

// Output data structured as
/*
{
    data: {}, // the input data you got
    impact: {}, // your best case estimation
    severeImpact: {} // your severe case estimation
}
*/

const covid19ImpactEstimator = (data) => {
  // Destructuring the given data
  // const {
  //   region,
  //   periodType,
  //   timeToElapse,
  //   reportedCases,
  //   population,
  //   totalHospitalBeds
  // } = data;
  //   // Destructuring the region of the given data
  // const {
  //   name,
  //   avgAge,
  //   avgDailyIncomeInUSD,
  //   avgDailyIncomePopulation
  // } = region;
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

  const impact = {};
  const severeImpact = {};

  // adding truncation  normalizing days to check weeks and months
  if (periodType === 'months') timeToElapse = Math.trunc(timeToElapse * 30);
  else if (periodType === 'weeks') timeToElapse = Math.trunc(timeToElapse * 7);
  else timeToElapse = Math.trunc(timeToElapse * 1);
  // where factor is 10 for a 30 day duration(there are 10 sets of 3 days in a perioid of 30 days) currentlyInfected x 1024
  const timeFactor = (currentlyInfected) => {
    const power = Math.trunc(timeToElapse / 3);
    return currentlyInfected * (2 ** power);
  };
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
  const computedollarsinfight = (infectionsByRequestedTime) => {
    const infections = infectionsByRequestedTime * avgDailyIncomeInUSD * avgDailyIncomePopulation;
    const result = infections / timeToElapse;
    return Math.trunc(result);
  };
  // challenge one //  can be modified to func estimateCurrentlyInfected {} & const estimateProjectedInfction {}
  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;
  impact.infectionsByRequestedTime = timeFactor(impact.currentlyInfected);
  severeImpact.infectionsByRequestedTime = timeFactor(impact.currentlyInfected);
  // challenge two //  can be modified to func  const estimatedServereCases {} & const estimatedBedSpaceAvailablility {}
  // impact.severeCasesByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.15); // 15%
  // severeImpact.severeCasesByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.15);
  // impact.hospitalBedsByRequestedTime = availableBeds(impact.severeCasesByRequestedTime);
  // severeImpact.hospitalBedsByRequestedTime = availableBeds(severeImpact.severeCasesByRequestedTime);
  // challenge three //  can be modified to func estimatedCasesForICU {} & const estimatedCasesForVentilators & estimateddollarsInFlight
  // impact.casesForICUByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.05);
  // impact.casesForVentilatorsByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.02);
  // impact.dollarsInFlight = computedollarsinfight(impact.infectionsByRequestedTime);
  // avgDailyIncomePopulation * avgDailyIncomeInUSD * timeToElapse;

  // severeImpact.casesForICUByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 0.05);
  // severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 0.02);
  // severeImpact.dollarsInFlight = computedollarsinfight(severeImpact.infectionsByRequestedTime);
  // avgDailyIncomePopulation * avgDailyIncomeInUSD * timeToElapse;
  // the input data inputed  // your best  case  estimation output // your severe case estimation output
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;

// const goEstimate = $q('[data-go-estimate]');
// // Create div // Add classes
// const showAlert = (className, message) => {
//   const div = document.createElement('div');
//   div.className = `alert alert-${className}`;
//   div.appendChild(document.createTextNode(message)); // Add text
//   const container = document.querySelector('#today'); // Get parent
//   const form = document.querySelector('#coivd-form'); // Get form
//   container.insertBefore(div, form); // Insert alert
//   // Timeout after 3 sec
//   setTimeout(() => {
//     document.querySelector('.alert').remove();
//   }, 3000);
//   //   div.innerHTML = `${message}`;
//   //   document.body.appendChild(div);
//   //   setTimeout(() => div.remove(), 3000);
// };

// goEstimate.addEventListener('click', (event) => {
//   event.preventDefault();
//   // input data
//   const pType = $q('[data-period-type]');
//   const tmToElapse = $q('[data-time-to-elapse]');
//   const rCases = $q('[data-reported-cases]');
//   const populatn = $q('[data-population]');
//   const tHospitalBeds = $q('[data-total-hospital-beds]');

//   const periodType = pType.value;
//   const timeToElapse = parseInt(tmToElapse.value);
//   const reportedCases = parseInt(rCases.value);
//   const population = parseInt(populatn.value);
//   const totalHospitalBeds = parseInt(tHospitalBeds.value);

//   if (!periodType || !timeToElapse || !reportedCases || !population || !totalHospitalBeds) {
//     // Error alert
//     showAlert('error', 'Oops! for better results Please fill all fields.');
//   } else {
//     goEstimate.disabled = true;

//     const input = {
//       region: {
//         name: 'Africa',
//         avgAge: 19.7,
//         avgDailyIncomeInUSD: 5,
//         avgDailyIncomePopulation: 0.71
//       },
//       periodType,
//       timeToElapse,
//       reportedCases,
//       population,
//       totalHospitalBeds
//     };
//     // call covid19ImapactEstimator
//     const covid19 = covid19ImpactEstimator(input);
//     const { impact } = covid19;
//     const { severeImpact } = covid19;
//     const impactUI = $q('#impact');
//     const severeImpactUI = $q('#severeImpact');
//     const impactsContainner = $q('.impacts');
//     // Insert cols
//     impactUI.innerHTML = `
//       <tr>
//         <th>Currently Infected</th>
//         <td>${impact.currentlyInfected}</td>
//       </tr>
//       <tr>
//         <th>Infections By Requested Time</th>
//         <td>${impact.infectionsByRequestedTime}</td>
//       </tr>
//       <tr>
//         <th>Severe Cases By Requested Time</th>
//         <td>${impact.severeCasesByRequestedTime}</td>
//       </tr>
//       <tr>
//         <th>Hospital Beds By Requested Time</th>
//         <td>${impact.hospitalBedsByRequestedTime}</td>
//       </tr>
//       <tr>
//         <th>Cases For ICU By Requested Time</th>
//         <td>${impact.casesForICUByRequestedTime}</td>
//       </tr>
//       <tr>
//         <th>Cases For Ventilators By Requested Time</th>
//         <td>${impact.casesForVentilatorsByRequestedTime}</td>
//       </tr>
//       <tr>
//         <th>Dollars In Flight</th>
//         <td>${impact.dollarsInFlight}</td>
//       </tr>
//     `;

//     severeImpactUI.innerHTML = `
//       <tr>
//         <th>Currently Infected</th>
//         <td>${severeImpact.currentlyInfected}</td>
//       </tr>
//       <tr>
//         <th>Infections By Requested Time</th>
//         <td>${severeImpact.infectionsByRequestedTime}</td>
//       </tr>
//       <tr>
//         <th>Severe Cases By Requested Time</th>
//         <td>${severeImpact.severeCasesByRequestedTime}</td>
//       </tr>
//       <tr>
//         <th>Hospital Beds By Requested Time</th>
//         <td>${severeImpact.hospitalBedsByRequestedTime}</td>
//       </tr>
//       <tr>
//         <th>Cases For ICU By Requested Time</th>
//         <td>${severeImpact.casesForICUByRequestedTime}</td>
//       </tr>
//       <tr>
//         <th>Cases For Ventilators By Requested Time</th>
//         <td>${severeImpact.casesForVentilatorsByRequestedTime}</td>
//       </tr>
//       <tr>
//         <th>Dollars In Flight</th>
//         <td>${severeImpact.dollarsInFlight}</td>
//       </tr>
//     `;

//     showAlert('success', 'Data Submitted successfuly, scroll to view analysis.');
//     impactsContainner.classList.remove('is-hidden');
//     goEstimate.disabled = false;
//     pType.value = '';
//     tmToElapse.value = '';
//     rCases.value = '';
//     populatn.value = '';
//     tHospitalBeds.value = '';
//   }
// });
