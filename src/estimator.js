import chain from "./index"

const covid19ImpactEstimator = (data) => {
    const estimator = chain(
        // challenge one 
        estimateCurrentlyInfected,
        estimateProjectedInfction,

        // challenge two
        estimatedServereCases,
        estimatedBedSpaceAvailablility,

        // challenge three
        estimatedCasesForICU,
        estimatedCasesForVentilators,
        estimateddollarsInFlight
    );

    return estimator({
        data,
        impact: {},
        servereImpact:{}
    });
};

export default covid19ImpactEstimator;
