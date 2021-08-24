import { useMemo, useState } from "preact/hooks";
import { IEstimate } from "./types";

interface IProps {
  estimate: IEstimate;
}

interface IRow {
  age: number;
  month: number;
  pensioner: number;
  spouse: number;
  totalPaidToPensioner: number;
  totalPaidToSpouse: number;
}

export const MonthlySummary = (props: IProps) => {
  const {estimate} = props;
  const [collapseMonths, setCollapseMonths] = useState<boolean>(false);
  const onToggleCollapseMonths = () => setCollapseMonths(!collapseMonths);
  
  
  const months = useMemo(() => {
    let age = estimate.ageAtRetirement;
    let payments: IRow[] = [];
    let totalPaidToPensioner = 0;
    let totalPaidToSpouse = 0;

    while (age < 65 && age < estimate.ageAtDeath){
      for (let month = 0; month < 12; month++){
        totalPaidToPensioner += estimate.monthlyPension + estimate.bridge;
        payments.push({
          age,
          month,
          pensioner: estimate.monthlyPension + estimate.bridge,
          spouse: 0,
          totalPaidToPensioner,
          totalPaidToSpouse,
        });
      }
      age ++;
    }
    while (age < estimate.ageAtDeath) {
      for (let month = 0; month < 12; month++) {
        totalPaidToPensioner += estimate.monthlyPension;
        payments.push({
          age,
          month,
          pensioner: estimate.monthlyPension,
          spouse: 0,
          totalPaidToPensioner,
          totalPaidToSpouse
        });
      }
      age++;
    }
    while (age < estimate.spouseAgeAtDeath) {
      for (let month = 0; month < 12; month++) {
        totalPaidToSpouse += estimate.monthlyPension;
        payments.push({
          age,
          month,
          pensioner: 0,
          spouse: estimate.monthlyPension,
          totalPaidToPensioner,
          totalPaidToSpouse
        });
      }
      age++;
    }
    return payments;
  }, [estimate.ageAtRetirement, estimate.ageAtRetirement, estimate.bridge, estimate.monthlyPension, estimate.spouseAgeAtDeath]);

  let rows;
  if (collapseMonths){
    rows = [];
    let addedCollapsedRow = false;
    for (let index = 0; index < months.length; index++){
      const month = months[index];
      if (index === 0 || index === months.length - 1){
        rows.push(
          <tr key={index}>
            <td>{month.age}</td>
            <td>{month.month + 1}</td>
            <td>{month.pensioner}</td>
            <td>{month.spouse}</td>
            <td>{month.totalPaidToPensioner}</td>
            <td>{month.totalPaidToSpouse}</td>
            <td>{month.totalPaidToPensioner + month.totalPaidToSpouse}</td>
          </tr>
        );
        continue;
      }
      const lastMonth = months[index - 1];
      const nextMonth = months[index + 1];
      const hasChanged = month.pensioner !== lastMonth.pensioner
        || month.spouse !== lastMonth.spouse
        || month.pensioner !== nextMonth.pensioner
        || month.spouse !== nextMonth.spouse;
      if (hasChanged){
        addedCollapsedRow = false;
        rows.push(
          <tr key={index}>
            <td>{month.age}</td>
            <td>{month.month + 1}</td>
            <td>{month.pensioner}</td>
            <td>{month.spouse}</td>
            <td>{month.totalPaidToPensioner}</td>
            <td>{month.totalPaidToSpouse}</td>
            <td>{month.totalPaidToPensioner + month.totalPaidToSpouse}</td>
          </tr>
        );
        continue;
      }
      if (!addedCollapsedRow){
        addedCollapsedRow = true;
        rows.push(
          <tr key={index}>
            <td colSpan={2}>...</td>
            <td>{month.pensioner}</td>
            <td>{month.spouse}</td>
            <td colSpan={3}>...</td>
          </tr>
        );
      }
    }
  } else {
    rows = months.map((month, index) => (
      <tr key={index}>
        <td>{month.age}</td>
        <td>{month.month + 1}</td>
        <td>{month.pensioner}</td>
        <td>{month.spouse}</td>
        <td>{month.totalPaidToPensioner}</td>
        <td>{month.totalPaidToSpouse}</td>
        <td>{month.totalPaidToPensioner + month.totalPaidToSpouse}</td>
      </tr>
    ));
  }

  return (
    <div>
      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox" checked={collapseMonths} onClick={onToggleCollapseMonths} />
            Summarize
          </label>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Age</th>
            <th>Month</th>
            <th>Payment</th>
            <th>Spouse Payment</th>
            <th>Total Paid to Pensioner</th>
            <th>Total Paid to Spouse</th>
            <th>Total Paid</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};