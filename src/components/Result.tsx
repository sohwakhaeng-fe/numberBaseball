import React from "react";

const Result = ({ resultText }: { resultText: string }) => {
  return (
    <>
      <h3>📄 결과</h3>
      <div id="result">{resultText}</div>
    </>
  );
};

export default Result;
