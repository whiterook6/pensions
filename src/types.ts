export interface IEstimate {
  lifeType: "single life" | "joint life";

  jointLifePercentage: number; // from 0 to 1; format and parse input
  guaranteePeriod: number; // doesn't apply to joint life 100%

  pensionerName: string;
  monthlyPension: number;
  bridge: number;

  ageAtRetirement: number;
  ageAtDeath: number;

  hasSpouse: boolean;
  spouseName: string;
  spouseAgeAtDeath: number;
};

export const createEstimate = (source: Partial<IEstimate> = {}): IEstimate => {
  const data = {};
  Object.assign(
    data,
    {
      ageAtDeath: 70,
      ageAtRetirement: 60,
      bridge: 500,
      guaranteePeriod: 15,
      hasSpouse: true,
      jointLifePercentage: 1,
      lifeType: "joint life",
      monthlyPension: 1500,
      pensionerName: "",
      spouseAgeAtDeath: 75,
      spouseName: "",
    },
    source
  );
  return data as IEstimate;
}

export const calculateMonthlyPayment = (age: number, estimate: IEstimate) => {
  // after retirement, before age 65, and still alive
  if (age < 65 && age < estimate.ageAtDeath){
    return {
      pensioner: estimate.bridge + estimate.monthlyPension,
      spouse: 0,
      beneficiary: 0
    };

  // after 65, but still alive
  } else if (age < estimate.ageAtDeath){
    return {
      pensioner: estimate.monthlyPension,
      spouse: 0,
      beneficiary: 0
    };
  }

  // after death
  switch (estimate.lifeType){
    case "joint life":
      if (estimate.jointLifePercentage === 1){
        return {
          pensioner: 0,
          spouse: estimate.monthlyPension,
          beneficiary: 0
        };
      }

      if (age - 65 < estimate.guaranteePeriod){
        return {
          pensioner: 0,
          spouse: estimate.monthlyPension * estimate.jointLifePercentage,
          beneficiary: 0
        };
      }

      return {
        pensioner: 0,
        spouse: 0,
        beneficiary: 0
      }
    
    case "single life":
    default:
      if (age - 65 < estimate.guaranteePeriod){
        return {
          pensioner: 0,
          spouse: 0,
          beneficiary: estimate.monthlyPension
        };
      } else {
        return {
          pensioner: 0,
          spouse: 0,
          beneficiary: 0
        }
      }
  }
}
