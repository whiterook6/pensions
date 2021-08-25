export interface IEstimate {
  label: string;
  createdAt: Date;
  editedAt?: Date;
  
  pensionerName: string;
  monthlyPension: number;
  bridge: number;

  ageAtRetirement: number;
  ageAtDeath: number;

  hasSpouse: boolean;
  spouseName: string;
  spouseAgeAtDeath: number;
};

export const createEstimate = (data: Partial<IEstimate> = {}): IEstimate => {
  const estimate = {};
  Object.assign(estimate, {
    label: "",
    createdAt: new Date(Date.now()),
    pensionerName: "",
    monthlyPension: 1500,
    bridge: 500,
    ageAtRetirement: 60,
    ageAtDeath: 80,
    hasSpouse: true,
    spouseName: "",
    spouseAgeAtDeath: 80,
  }, data);
  return estimate as IEstimate;
}

export interface IPayment {
  year: number;
  month: number;
  pensionerPayment: number;
  spousePayment: number;
};
