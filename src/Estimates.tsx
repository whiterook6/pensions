import { useState } from "preact/hooks";
import { IEstimate, createEstimate } from "./types";

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
  const closeActive = () => {
    setState({
      activeEstimate: undefined,
      estimates
    });
  };
  const addEstimate = () => {
    const newEstimate = createEstimate();
    setState({
      estimates: [
        ...estimates,
        newEstimate
      ],
      activeEstimate: newEstimate
    })
  }

  return (
    <div class="container">
      <div class="columns">
        <div class="column">
          <h1>Saved Estimates</h1>
          {estimates.length === 0 && (
            <div>
              None saved.
              <button class="button is-small" onClick={addEstimate}>Create New</button>
            </div>
          )}
          {estimates.length > 0 && (
            <table class="table is-hoverable is-fullwidth is-striped">
              <colgroup>
                <col width="50%" />
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th>Estimates</th>
                  <th style={{textAlign:"right"}}>
                    <button class="button is-small" onClick={addEstimate}>Create New</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {estimates.map((estimate, index) => {
                  const isActive = estimate === activeEstimate;

                  const onRestore = () => {
                    if (!isActive) {
                      restoreEstimate(index);
                    }
                  };
                  const onCopy = () => copyEstimate(index);
                  const onDelete = () => deleteEstimate(index);

                  return (
                    <tr key={index} class={isActive ? "is-selected" : ""}>
                      <th style={{ verticalAlign: "middle" }} class="is-header">{estimate.label || `Unnamed Estimate ${index}`}</th>
                      <td style={{ verticalAlign: "middle", textAlign: "right" }}>
                        {estimate !== activeEstimate && (
                          <div class="buttons">
                            <button class="button is-small" onClick={onRestore}>Show</button>
                            <button class="button is-small" onClick={onCopy}>Copy</button>
                            <button class="button is-small is-danger" onClick={onDelete}>Delete</button>
                          </div>
                        ) || (
                            <button class="button is-small" onClick={closeActive}>Close</button>
                          )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div class="column is-two-thirds">
          {activeEstimate && activeEstimate.createdAt.toISOString()}
        </div>
      </div>
    </div>
  )
}