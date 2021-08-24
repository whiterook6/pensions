import { useState } from "preact/hooks";
import { IEstimate } from "./types";

export const Estimates = () => {
  const [{estimates, activeEstimate}, setState] = useState<{
    estimates: IEstimate[];
    activeEstimate?: IEstimate;
  }>({
    estimates: []
  });

  const restoreEstimate = (index) => {
    if (index >= 0 && index < estimates.length){
      setState({
        estimates,
        activeEstimate: estimates[index]
      });
    }
  }
  const copyEstimate = (index: number) => {
    if (index >= 0 && index < estimates.length){
      const toCopy = estimates[index];
      setState({
        estimates: [
          ...estimates.slice(0, index),
          {
            ...toCopy,
            createdAt: new Date(Date.now()),
            editedAt: undefined,
          },
          ...estimates.slice(index)
        ],
        activeEstimate
      });
    }
  }
  const deleteEstimate = (index: number) => {
    if (index >= 0 && index < estimates.length) {
      const newEstimates = estimates.slice();
      const deleted = newEstimates.splice(index, 1);
      setState({
        activeEstimate: deleted[0] === activeEstimate ? undefined : activeEstimate,
        estimates: newEstimates
      })
    }
  }
  const createNewEstimate = () => {
    if (activeEstimate === undefined){
      const newEstimate = {
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
      }
      setState({
        estimates: [
          ...estimates,
          newEstimate
        ],
        activeEstimate: newEstimate
      })
    }
  }

  return (
    <div>
      <h1>Saved Estimates</h1>
      {estimates.length === 0 && (
        <div>None saved. <button onClick={createNewEstimate}>Create New</button></div>
      )}
      {estimates.length > 0 && (
        <table class="table is-hoverable is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Estimates</th>
              <th>
                <button class="button is-small" onClick={createNewEstimate} disabled={activeEstimate !== undefined}>Create New</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {estimates.map((estimate, index) => {
              const onRestore = () => restoreEstimate(index);
              const onCopy = () => copyEstimate(index);
              const onDelete = () => deleteEstimate(index);
              return (
                <tr key={index} class={estimate === activeEstimate ? "is-selected" : ""}>
                  <td>{estimate.label || `Unnamed Estimate ${index}`}</td>
                  <td>
                    <div class="buttons">
                      <button class="button is-small" onClick={onRestore}>Show</button>
                      <button class="button is-small" onClick={onCopy}>Copy</button>
                      <button class="button is-small is-danger" onClick={onDelete}>Delete</button>
                    </div>
                  </td>
                </tr>
              )
            })}
         </tbody>
        </table>
      )}
      {activeEstimate && (
        <div>
          {activeEstimate.createdAt.toISOString()}
          
        </div>
      )}
    </div>
  )
}