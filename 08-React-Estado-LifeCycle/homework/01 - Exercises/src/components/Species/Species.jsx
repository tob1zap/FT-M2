import React from "react";

export default function Species(props) {
  return (
    <div>
      <h2>Species</h2>
      {props.species.map((specie) => {
        return (
          <button value={specie} key={specie} onClick={props.handleSpecies}>
            {specie}
          </button>
        );
      })}
      <button onClick={props.handleAllSpecies}>All Animals</button>
    </div>
  );
}
