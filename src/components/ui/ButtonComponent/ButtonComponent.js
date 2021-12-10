import React from "react";
import "./ButtonComponent.scss";

function ButtonComponent() {
  return (
    <>
      <button className="btn-sm btn-line-sm">ボタン</button>
			<button className="btn-sm btn-fill-sm">ボタン</button>
      <span></span>
      <h3>Button - large</h3>
      <button className="btn-lg btn-line-lg">ボタン</button>
      <button className="btn-lg btn-fill-lg">ボタン</button>
    </>
  );
}

export default ButtonComponent;
