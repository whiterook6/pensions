import { useState } from "preact/hooks";
import { MonthlySummary } from "./MonthlySummary";
import { createEstimate, IEstimate } from "./types";

export const App = () => {
  const [state, setState] = useState<IEstimate>(createEstimate());

  const onToggleHasSpouse = () => setState({...state, hasSpouse: !state.hasSpouse});
  const onChangePensionerName = (event: { currentTarget: { value: string } }) => {
    setState({
      ...state,
      pensionerName: event.currentTarget.value
    });
  }
  const onChangeSpouseName = (event: { currentTarget: { value: string } }) => {
    setState({
      ...state,
      spouseName: event.currentTarget.value
    });
  }

  const onChangeAgeAtRetirement = (event: {currentTarget: {value: string}}) => {
    const ageAtRetirement = parseInt(event.currentTarget.value, 10);
    setState({
      ...state,
      ageAtRetirement,
      ageAtDeath: Math.max(state.ageAtDeath, ageAtRetirement + 1)
    });
  };
  const onChangeAgeAtDeath = (event: {currentTarget: {value: string}}) => {
    const ageAtDeath = parseInt(event.currentTarget.value, 10);
    setState({
      ...state,
      ageAtDeath,
      ageAtRetirement: Math.min(state.ageAtRetirement, ageAtDeath - 1)
    });
  };
  const onChangeAgeOfSpouceAtDeath = (event: {currentTarget: {value: string}}) => {
    setState({
      ...state,
      spouseAgeAtDeath: parseInt(event.currentTarget.value, 10)
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
      bridge: parseInt(event.currentTarget.value, 10)
    });
  };
  const setJointLife = () => {
    setState({
      ...state,
      lifeType: "joint life"
    });
  };
  const setSingleLife = () => {
    setState({
      ...state,
      lifeType: "single life"
    });
  };

  

  
  return (
    <div class="container">
      <div class="columns">
        <div class="column">
          <h1>Options</h1>
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" value={state.pensionerName} onChange={onChangePensionerName} />
            </div>
          </div>
          <div class="field">
            <label class="label">Age at Retirement: {state.ageAtRetirement}</label>
            <div class="control">
              <input class="slider is-fullwidth" type="range" min={1} max={100} value={state.ageAtRetirement} onInput={onChangeAgeAtRetirement} />
            </div>
          </div>
          <div class="field">
            <label class="label">Age at Death: {state.ageAtDeath}</label>
            <div class="control">
              <input class="slider is-fullwidth" type="range" min={1} max={100} value={state.ageAtDeath} onInput={onChangeAgeAtDeath} />
            </div>
          </div>
          <div class="field">
            <label class="label">Monthly Pension Paynent</label>
            <div class="control">
              <input class="input" value={state.monthlyPension} onChange={onChangeMonthlyPension} />
            </div>
          </div>
          <div class="field">
            <label class="label">Bridge Payment (until 65)</label>
            <div class="control">
              <input class="input" value={state.bridge} onChange={onChangeBridge} disabled={state.ageAtRetirement >= 65} />
            </div>
          </div>
          <h1>Options</h1>
          <div class="field">
            <div class="label">Joint or Single Life Option</div>
            <div class="control">
              <label class="radio">
                <input type="radio" checked={state.lifeType === "single life"} onClick={setSingleLife} />
                Single Life
              </label>
              <label class="radio">
                <input type="radio" checked={state.lifeType === "joint life"} onClick={setJointLife} />
                Joint life
              </label>
            </div>
          </div>
          <div class="field">
            <div class="label">Guarantee Period</div>
            <div class="control">
              <label class="radio">
                <input type="radio" checked={state.guaranteePeriod === 5} onClick={setSingleLife} />
                5 Years
              </label>
              <label class="radio">
                <input type="radio" checked={state.guaranteePeriod === 10} onClick={setJointLife} />
                10 years
              </label>
              <label class="radio">
                <input type="radio" checked={state.guaranteePeriod === 15} onClick={setJointLife} />
                15 years
              </label>
            </div>
          </div>
          <div class="field">
            <div class="label">Joint Life Percentage</div>
            <div class="control">
              <label class="radio">
                <input type="radio" checked={state.jointLifePercentage === 5} onClick={setSingleLife} />
                60%
              </label>
              <label class="radio">
                <input type="radio" checked={state.guaranteePeriod === 10} onClick={setJointLife} />
                100%
              </label>
            </div>
          </div>
          <h1>Spouse</h1>
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox" checked={state.hasSpouse} onClick={onToggleHasSpouse}/>
                Spouse?
              </label>
            </div>
          </div>
          <div class="field">
            <label class="label">Spouse's Name</label>
            <div class="control">
              <input class="input" value={state.spouseName} onChange={onChangeSpouseName} disabled={!state.hasSpouse} />
            </div>
          </div>
          <div class="field">
            <label class="label">Spouse's Age at Death: {state.spouseAgeAtDeath}</label>
            <div class="control">
              <input class="slider is-fullwidth" type="range" min={1} max={100} value={state.spouseAgeAtDeath} disabled={!state.hasSpouse} onInput={onChangeAgeOfSpouceAtDeath} />
            </div>
          </div>
        </div>
        <div class="column is-three-quarters">
          <h1>Monthly Payments</h1>
          <MonthlySummary estimate={state} />
        </div>
      </div>
    </div>
  );
}