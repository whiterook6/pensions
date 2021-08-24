export interface IEstimate {
  pensionerName: string;
  monthlyPension: number;
  bridge: number;

  ageAtRetirement: number;
  ageAtDeath: number;

  hasSpouse: boolean;
  spouseName: string;
  spouseAgeAtDeath: number;
};

export interface IPayment {
  year: number;
  month: number;
  pensionerPayment: number;
  spousePayment: number;
};
