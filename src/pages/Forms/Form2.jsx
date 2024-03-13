import React from "react";

import { useNavigate } from "react-router-dom";
import "./Form2.scss";

import Signature from "Assets/FormImage/Signature.jpeg"

export const Form2 = () => {
  const navigate = useNavigate()



  const nextHandler = () => {
    navigate("/user/forms/d3")
    window.location.reload(); 
  }

  const previousHandler = () => {
    navigate("/user/forms/d1")
    window.location.reload(); 
  }

  return (
    <div className="Form2">
      <ul className="Form2__list">
        <li>
          <div className="form2__section">SECTION II - SPONSOR/EMPLOYEE DECLARATION AND REMARKS </div>
          <div className="form2__info">
            My dedication and support as a family member is invaluable. Your
            strength and resilience inspire me to fulfill my duties with honor.
            I am grateful for your unwavering love and understanding, which fuel
            my determination to serve our country.
          </div>
        </li>
        <li>
          <div className="form2__title"> NOTARY SIGNATURE AND SEAL </div>
        </li>
        <li>
          <div className="form2__info">
            I certify the information provided in connection with the
            eligibility requirements of this form is true and accurate to the
            best of my knowledge. (If not signed in the presence of the
            authorizing/verifying official, the signature must be notarized.)
          </div>
        </li>
        <li>
          <div className="form2__title">23. SPONSOR/EMPLOYEE SIGNATURE </div>
           <img src={Signature} alt="" className="signature"/>
        </li>

        <div className="button__navigation">
          <div>
            <button onClick={previousHandler}>Back</button>
            <button onClick={nextHandler}>Next</button>
          </div>
          <button>Clear from</button>
        </div>
      </ul>
    </div>
  );
};
