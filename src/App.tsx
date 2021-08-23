import { useState } from "preact/hooks";

export const App = () => {
  const [state, setState] = useState({
    ageAtRetirement: 60,
    ageAtDeath: 70,
    ageOfSpouseAtDeath: 80,

    monthlyPension: 2198,
    bridgeUntil65: 748,
  });

  const onChangeAgeAtRetirement = (event: {currentTarget: {value: string}}) => {
    const ageAtRetirement = parseInt(event.currentTarget.value, 10);
    setState({
      ...state,
      ageAtRetirement,
      ageAtDeath: Math.max(state.ageAtDeath, ageAtRetirement)
    });
  };
  const onChangeAgeAtDeath = (event: {currentTarget: {value: string}}) => {
    const ageAtDeath = parseInt(event.currentTarget.value, 10);
    setState({
      ...state,
      ageAtDeath,
      ageAtRetirement: Math.min(state.ageAtRetirement, ageAtDeath)
    });
  };
  const onChangeAgeOfSpouceAtDeath = (event: {currentTarget: {value: string}}) => {
    setState({
      ...state,
      ageOfSpouseAtDeath: parseInt(event.currentTarget.value, 10)
    });
  };
  const onChangeMonthlyPension = (event: {currentTarget: {value: string}}) => {
    setState({
      ...state,
      monthlyPension: parseInt(event.currentTarget.value, 10)
    });
  };
  const onChangeBridge = (event: {currentTarget: {value: string}}) => {
    setState({
      ...state,
      bridgeUntil65: parseInt(event.currentTarget.value, 10)
    });
  };

  let totalPaidToPensioner = 0;
  let totalPaidToSpouse = 0;
  const months: Array<{
    age: number,
    month: number,
    pensioner: number,
    spouse: number,
    totalPaidToPensioner: number,
    totalPaidToSpouse: number,
  }> = [];
  let age = state.ageAtRetirement
  while (age < 65){
    for (let month = 0; month < 12; month++){
      const payment = state.monthlyPension + state.bridgeUntil65;
      totalPaidToPensioner += payment;
      months.push({
        age,
        month,
        pensioner: state.monthlyPension + state.bridgeUntil65,
        spouse: 0,
        totalPaidToPensioner,
        totalPaidToSpouse,
      });
    }
    age += 1;
  }
  while (age < state.ageAtDeath){
    for (let month = 0; month < 12; month++){
      const payment = state.monthlyPension;
      totalPaidToPensioner += payment;
      months.push({
        age,
        month,
        pensioner: payment,
        spouse: 0,
        totalPaidToPensioner,
        totalPaidToSpouse,
      });
    }
    age += 1;
  }
  while (age < state.ageOfSpouseAtDeath){
    for (let month = 0; month < 12; month++){
      const payment = state.monthlyPension;
      totalPaidToSpouse += payment;
      months.push({
        age,
        month,
        pensioner: 0,
        spouse: payment,
        totalPaidToPensioner,
        totalPaidToSpouse,
      });
    }
    age += 1;
  }

  
  return (
    <div>
      <h1>Ages</h1>
      <label>Age at Retirement: {state.ageAtRetirement}</label>
      <div>
        <input type="range" min={1} max={100} value={state.ageAtRetirement} onInput={onChangeAgeAtRetirement} />
      </div>
      <label>Age at Death: {state.ageAtDeath}</label>
      <div>
        <input type="range" min={1} max={100} value={state.ageAtDeath} onInput={onChangeAgeAtDeath} />
      </div>
      <label>Age of Spouse at Death: {state.ageOfSpouseAtDeath}</label>
      <div>
        <input type="range" min={1} max={100} value={state.ageOfSpouseAtDeath} onInput={onChangeAgeOfSpouceAtDeath} />
      </div>
      <h2>Pension Value</h2>
      <div>
        <label>Monthly Pension Paynent</label>
        <input value={state.monthlyPension} onChange={onChangeMonthlyPension} />
      </div>
      <div>
        <label>Bridge Payment (until 65)</label>
        <input value={state.bridgeUntil65} onChange={onChangeBridge} />
      </div>
      <h1>Payments</h1>
      <table>
        <thead>
          <tr>
            <th>Age</th>
            <th>Month</th>
            <th>Payment</th>
            <th>Spouse Payment</th>
            <th>Total Paid to Pensioner</th>
            <th>Total Paid to Spouse</th>
          </tr>
        </thead>
        {months.map(month => (
          <tr key={`${month.age}${month.month}${month.totalPaidToPensioner}${month.totalPaidToSpouse}`}>
            <td>{month.age}</td>
            <td>{month.month + 1}</td>
            <td>{month.pensioner}</td>
            <td>{month.spouse}</td>
            <td>{month.totalPaidToPensioner}</td>
            <td>{month.totalPaidToSpouse}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}