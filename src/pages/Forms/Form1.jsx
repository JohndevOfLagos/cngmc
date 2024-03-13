import React from "react";
import { Icon } from "@iconify/react";
import "./Form1.scss";


import Banner from "Assets/MillitaryImage/Banner-JoinNow-ArmyAir2.png";
import ArmyPhoto from "Assets/MillitaryImage/G.jpeg";


import { useNavigate } from "react-router-dom";

import PriceImage from "Assets/FormImage/price.jpeg";

// import { Link } from "react-router-dom";

// /*  FIREBASE  */


export const Form1 = () => {
  const navigate = useNavigate(); 
  

  
  const nextHandler = () => {
    navigate("/user/forms/d2")
    window.location.reload(); 
  };

  return (
    <div className="Form1">
      <ul className="Form1-list">
      <li>
            <div className="Form1__banner">
                  <img src={Banner} className="Banner" alt="" />
                  <img src={ArmyPhoto} alt="" />
                </div>
              </li>
              <li>
              <div className="Form1-head-title">DD1172-2 FORM</div>
                <div className="Form1-head__info">
                  The name and photo associated with your Google Account will be
                  recorded when you upload files and submit this form. Your
                  email address is not part of your response.
                </div>
              </li>
        <li>
          <div className="Form1__head">
            <div className="heading">
              "MILLITARY FAMILY MEMBER/DEERS IDENTIFICATION APPLICATION
              ENROLLMENT FORM"
            </div>
            <p>
              Please read Agency Disclosure Notice, Privacy Act Statement, and
              Instructions prior to completing this form.
            </p>
            <span>
              <span>
                <Icon icon="mdi:dot" />
              </span>
              OMB No. 0704-0415 OMB approval expires 20230430
            </span>
          </div>
        </li>
        <li>
          <div className="Form1__section">SECTION I - SPONSOR/EMPLOYEE INFORMATION</div>
        </li>
        <li>
          <div>
            <div className="heading">
              1. NAME <div className="slant">(Last, First, Middle) </div>
            </div>
            <div className="answer">Rowland Price T.</div>
          </div>
        </li>
        <li>
          <div>
            <div className="heading">2. GENDER</div>
            <div className="answer">Male</div>
          </div>
        </li>
        <li>
            <div className="heading">3. SSN NO.</div>
            <div className="answer">213-41-2189</div>
        </li>
        <li>
            <div className="heading">4. DOD ID NO.</div>
            <div className="answer">L548645984</div>
        </li>
        <li>
          <div>
            <h4 className="heading">
              5. UPLOAD A COPY OR PHOTO OF YOUR DOD ID{" "}
            </h4>
            <img src={PriceImage} alt="" className="answer priceImage" />
          </div>
        </li>
        <li>
            <h4 className="heading">6. STATUS</h4>
            <div className="answer">Divorce</div>
        </li>
        <li>
   
            <h4 className="heading">7. ORGANIZATION</h4>
            <div className="answer">CMS / COLORADO NATIONAL GUARD</div>
    
        </li>
        <li>
       
            <h4 className="heading">8. PAY GRADE </h4>
            <div className="answer">E9</div>
    
        </li>
        <li>
            <h4 className="heading">9. GEN. CAT</h4>
            <div className="answer">1</div>
 
        </li>
        <li>
            <h4 className="heading">10. CITIZENSHIP</h4>
            <div className="answer">US</div>
      
        </li>
        <li>

            <h4 className="heading">7. ORGANIZATION</h4>
            <div className="answer">CMS / COLORADO NATIONAL GUARD</div>
        </li>
        <li>
            <div className="heading">11. DATE OF BIRTH<span className="slant">(YYYYMMDD)</span></div>
            <div className="answer">08/08/1969</div>
        </li>
        <li>
            <div className="heading">12. PLACE OF BIRTH </div>
            <div className="answer">West Africa Nigeria</div>
        </li>
        <li>
            <div className="heading">13. CURRENT HOME ADDRESS </div>
            <div className="answer">1919 SW 3rd Ave #1</div>
        </li>
        <li>
            <div className="heading">14. CITY </div>
            <div className="answer">Mami</div>
     
        </li>
        <li>
            <div className="heading">15. STATE </div>
            <div className="answer">Florida</div>
      
        </li>
        <li>
          
            <div className="heading">16. ZIP CODE</div>
            <div className="answer">33129</div>
          
        </li>
        <li>
         
            <div className="heading">17. COUNTRY</div>
            <div className="answer">USA</div>
         
        </li>
        <li>
         
            <div className="heading">18. PRIMARY EMAIL ADDRESS </div>
            <div className="answer">pricerowland574@gmail.com</div>
         
        </li>
        <li>
         
            <div className="heading">19. TELEPHONE NUMBER</div>
            <div className="answer">(303) 491-4591</div>
         
        </li>
        <li>
    
            <div className="heading">20. CITY OF DUTY LOCATION </div>
            <div className="answer">Colorado</div>
         
        </li>
        <li>
        
            <div className="heading">21. STATE OF DUTY LOCATION </div>
            <div className="answer">Denver</div>
         
        </li>
        <li>
            <div className="heading">22. COUNTRY OF DUTY LOCATION </div>
            <div className="answer">USA</div>
        </li>
      </ul>

      <div className="button__control">
        <button className="next__btn" onClick={nextHandler}>
          next
        </button>
        <button className="clear-form__btn">Clear form</button>
      </div>
    
    </div>
  );
};
