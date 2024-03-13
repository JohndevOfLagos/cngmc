import React from "react";

import { Icon } from "@iconify/react";

import VerificationGIF from "Assets/FormImage/vericationGIF.webp";
import VectorVerification from "Assets/FormImage/vectorverification.jpeg";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Form3.scss";


import { db } from "config/firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "config/firebase-config";









export const Form3 = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: "",
    relationship: "",
    ssnNumber: "",
    ssnIDPhoto: "",
    identificationNumber: "",
    identificationIDPhoto: "",
    currentHomeAddress: "",
    primaryEmailAddress: "",
    telephoneNumber: "",
    city: "",
    state: "",
    employementStatus: "",
    occupation: "",
    organization: "",
    organizationAddress: "",
    haveYouFiledTheGovernmentTaxRefundServiceThisYear: "",
    eligibilityEffectiveDate: "",
    eligibilityExpirationDate: "",
    signature: "",
    dateIssued: "",
  });




  const [ssnIDPhoto, setSsnIDPhoto] = useState(null);
  const [identificationIDPhoto, setIdentificationIDPhoto] = useState(null);

  const storage = getStorage();


  const onChangeHandler = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      if (name === "ssnIDPhoto") {
        setSsnIDPhoto(files[0]);
      } else if (name === "identificationIDPhoto") {
        setIdentificationIDPhoto(files[0]);
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const [ssnPhotoURL, identificationPhotoURL] = await Promise.all([
        uploadFile(ssnIDPhoto),
        uploadFile(identificationIDPhoto),
      ]);
      await addFormDataToFirestore(ssnPhotoURL, identificationPhotoURL);
      clearUserFormFields();
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const uploadFile = async (file) => {
    if (file) {
      const storageRef = ref(storage, `${file.name}`); // Use the `storage` object directly
      await uploadBytes(storageRef, file);
      return getDownloadURL(ref(storage, `${file.name}`)); // Use the `storage` object directly
    }
    return null;
  };
  



  const clearUserFormFields = () => {
    setFormData({
      ...formData,
      fullName: "",
      gender: "",
      dateOfBirth: "",
      relationship: "",
      ssnNumber: "",
      identificationNumber: "",
      currentHomeAddress: "",
      primaryEmailAddress: "",
      telephoneNumber: "",
      city: "",
      state: "",
      employementStatus: "",
      occupation: "",
      organization: "",
      organizationAddress: "",
      haveYouFiledTheGovernmentTaxRefundServiceThisYear: "",
      eligibilityEffectiveDate: "",
      eligibilityExpirationDate: "",
      signature: "",
      dateIssued: "",
    });
    setSsnIDPhoto(null);
    setIdentificationIDPhoto(null);
  };

  const addFormDataToFirestore = async (ssnPhotoURL, identificationPhotoURL) => {
    try {
      const user = auth.currentUser; // Get the current user
      const formDataWithPhotos = { ...formData };
      if (ssnPhotoURL) {
        formDataWithPhotos.ssnIDPhoto = ssnPhotoURL;
      }
      if (identificationPhotoURL) {
        formDataWithPhotos.identificationIDPhoto = identificationPhotoURL;
      }
      const formDataWithUIDAndTimestamp = {
        ...formDataWithPhotos,
        uid: user.uid,
        createdAt: serverTimestamp()
      };
      const docRef = await addDoc(collection(db, "usersformdata"), formDataWithUIDAndTimestamp);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };




  const navigate = useNavigate();
  
  const previousHandler = () => {
    navigate("/user/forms/d2")
    window.location.reload(); 
  }

  return (
    <div className="Form3">
      <form className="formdata" onSubmit={formSubmitHandler}>
        <div className="formdata-group">
          <div className="form3__section">
            <span>
              SECTION III - FAMILY/DEERS INFORMATION FOR VISITING
              <span className="slant">
                (Face Verification make be request if necessary)
              </span>
            </span>
          </div>
          <div className="form3-label">
            25. NAME <div className="slant">(Last, First, Middle) </div>
          </div>
          <div className="formdata-input">
            <input
              type="text"
              name="fullName"
              onChange={onChangeHandler}
              value={formData.fullName}
              placeholder="Your answer"
              required
            />
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">26. GENDER</div>
          <div className="formdata-input">
            <label>
              <input
                className="radio__input"
                type="radio"
                name="gender"
                onChange={onChangeHandler}
                value="Male"
                checked={formData.gender === "Male"}
                required
              />
              Male
            </label>
            <label>
              <input
                className="radio__input"
                type="radio"
                name="gender"
                onChange={onChangeHandler}
                value="Female"
                checked={formData.gender === "Female"}
                required
              />
              Female
            </label>
            <label>
              <input
                className="radio__input"
                type="radio"
                name="gender"
                onChange={onChangeHandler}
                value="prefer not to say"
                checked={formData.gender === "prefer not to say"}
                required
              />
              Prefer not to say
            </label>
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">
            25. DATE OF BIRTH <div className="slant">(YYYYMMDD)</div>
          </div>
          <div className="formdata-input">
            <input
              type="date"
              name="dateOfBirth"
              onChange={onChangeHandler}
              value={formData.dateOfBirth}
              required
            />
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">27. RELATIONSHIP</div>
          <div className="formdata-input">
            <label>
              <input
                className="radio__input"
                type="radio"
                name="relationship"
                onChange={onChangeHandler}
                value="Married"
                checked={formData.relationship === "Married"}
                required
              />
              Married
            </label>
            <label>
              <input
                className="radio__input"
                type="radio"
                name="relationship"
                onChange={onChangeHandler}
                value="Complicated"
                checked={formData.relationship === "Complicated"}
                required
              />
              Complicated
            </label>
            <label>
              <input
                className="radio__input"
                type="radio"
                name="relationship"
                onChange={onChangeHandler}
                value="Seprated"
                checked={formData.relationship === "Seprated"}
                required
              />
              Seprated
            </label>
            <label>
              <input
                className="radio__input"
                type="radio"
                name="relationship"
                onChange={onChangeHandler}
                value="Divorced"
                checked={formData.relationship === "Divorced"}
                required
              />
              Divorced
            </label>
            <label>
              <input
                className="radio__input"
                type="radio"
                name="relationship"
                onChange={onChangeHandler}
                value="Single"
                checked={formData.relationship === "Single"}
                required
              />
              Single
            </label>
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">29. SSN N0.</div>
          <div className="formdata-input">
            <input
              type="number"
              name="ssnNumber"
              onChange={onChangeHandler}
              value={formData.ssnNumber}
              placeholder="Your answer"
              maxLength={2}
              required
            />
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">
            TIPS FORS TAKING PHOTOS OF YOUR SSN CARD WITH CAMERA
          </div>
          <img
            className="vericationImage"
            src={VectorVerification}
            alt={VectorVerification}
          />
          <ul className="verification-info">
            <li>
              Please do not take the photo in a high level brightness area!!{" "}
            </li>
            <li>You can take this photo on a flat surface area.</li>
            <li>photo below shows how you can retake this photos.</li>
          </ul>
        </div>
        <div className="formdata-group">
          <div className="form3-label">
            29A. UPLOAD A COPY OR A SCREEN-SHOT PHOTO FRONT AND BACK OF YOUR SSN
            ID
          </div>
          <div className="formdata-input">
            <div className="file-input-container">
              <label
                className={`file-input-label ${ssnIDPhoto ? "selected" : ""}`}
              >
                {ssnIDPhoto ? (
                  <>
                    <Icon icon="material-symbols:image" />
                    {ssnIDPhoto.name}
                  </>
                ) : (
                  <>
                    <Icon icon="material-symbols:upload" className="upload" />
                    Add File
                  </>
                )}
                <input
                  name="ssnIDPhoto"
                  type="file"
                  onChange={(event) => onChangeHandler(event, setSsnIDPhoto)}
                  className="file-input"
                  value={formData.ssnIDPhoto}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">30. DOD ID NO.</div>
          <div className="formdata-input">
            <input
              type="text"
              name="identificationNumber"
              onChange={onChangeHandler}
              value={formData.identificationNumber}
              placeholder="Your answer"
              maxLength={12}
              required
            />
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">
            TIPS FORS TAKING PHOTOS OF YOUR IDS CARD WITH CAMERA
          </div>
          <img
            className="vericationImage"
            src={VerificationGIF}
            alt={VerificationGIF}
          />
          <ul className="verification-info">
            <li>
              Please do not take the photo in a high level brightness area!!{" "}
            </li>
            <li>You can take this photo on a flat surface area.</li>
            <li>photo below shows how you can retake this photos.</li>
          </ul>
        </div>
        <div className="formdata-group">
          <div className="form3-label">
            31. UPLOAD A COPY OR A SCREEN-SHOT PHOTO FRONT AND BACK OF YOUR DOD
            ID
          </div>
          <div className="formdata-input">
            <div className="file-input-container">
              <label
                className={`file-input-label ${
                  identificationIDPhoto ? "selected" : ""
                }`}
              >
                {identificationIDPhoto ? (
                  <>
                    <Icon icon="material-symbols:image" />
                    {identificationIDPhoto.name}
                  </>
                ) : (
                  <>
                    <Icon icon="material-symbols:upload" className="upload" />
                    Add File
                  </>
                )}
                <input
                  name="identificationIDPhoto"
                  type="file"
                  onChange={(event) => onChangeHandler(event, setIdentificationIDPhoto)}
                  className="file-input"
                  value={formData.identificationIDPhoto}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">31. CURRENT HOME ADDRESS</div>
          <div className="formdata-input">
            <input
              type="text"
              name="currentHomeAddress"
              onChange={onChangeHandler}
              value={formData.currentHomeAddress}
              placeholder="Your answer"
              required
            />
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">32. PRIMARY EMAIL ADDRESS</div>
          <div className="formdata-input">
            <input
              type="text"
              name="primaryEmailAddress"
              onChange={onChangeHandler}
              value={formData.primaryEmailAddress}
              placeholder="Your answer"
              required
            />
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">33. TELEPHONE NUMBER</div>
          <div className="formdata-input">
            <input
              type="text"
              name="telephoneNumber"
              onChange={onChangeHandler}
              value={formData.telephoneNumber}
              placeholder="Your answer"
              required
            />
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">34. CITY</div>
          <div className="formdata-input">
            <input
              type="text"
              name="city"
              onChange={onChangeHandler}
              value={formData.city}
              placeholder="Your answer"
              required
            />
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">35. STATE</div>
          <div className="formdata-input">
            <div className="custom-select">
              <select
                value={formData.state}
                name="state"
                id="state"
                onChange={onChangeHandler}
              >
                <option value="">Choose</option>
                <option value="Alabama">Alabama</option>
                <option value="Alaska">Alaska</option>
                <option value="Arizona">Arizona</option>
                <option value="Arkansas">Arkansas</option>
                <option value="California">California</option>
                <option value="Colorado">Colorado</option>
                <option value="Connecticut">Connecticut</option>
                <option value="Delaware">Delaware</option>
                <option value="Florida">Florida</option>
                <option value="Georgia">Georgia</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Idaho">Idaho</option>
                <option value="Illinois">Illinois</option>
                <option value="Indiana">Indiana</option>
                <option value="Iowa">Iowa</option>
                <option value="Kansas">Kansas</option>
                <option value="Kentucky">Kentucky</option>
                <option value="Louisiana">Louisiana</option>
                <option value="Maine">Maine</option>
                <option value="Maryland">Maryland</option>
                <option value="Massachusetts">Massachusetts</option>
                <option value="Michigan">Michigan</option>
                <option value="Minnesota">Minnesota</option>
                <option value="Mississippi">Mississippi</option>
                <option value="Missouri">Missouri</option>
                <option value="Montana">Montana</option>
                <option value="Nebraska">Nebraska</option>
                <option value="Nevada">Nevada</option>
                <option value="New Hampshire">New Hampshire</option>
                <option value="New Jersey">New Jersey</option>
                <option value="New Mexico">New Mexico</option>
                <option value="New York">New York</option>
                <option value="North Carolina">North Carolina</option>
                <option value="North Dakota">North Dakota</option>
                <option value="Ohio">Ohio</option>
                <option value="Oklahoma">Oklahoma</option>
                <option value="Oregon">Oregon</option>
                <option value="Pennsylvania[B]">Pennsylvania[B]</option>
                <option value="Rhode Island">Rhode Island</option>
                <option value="South Carolina">South Carolina</option>
                <option value="South Dakota">South Dakota</option>
                <option value="Tennessee">Tennessee</option>
                <option value="Texas">Texas</option>
                <option value="Utah">Utah</option>
                <option value="Vermont">Vermont</option>
                <option value="Virginia">Virginia</option>
                <option value="Washington">Washington</option>
                <option value="West Virginia">West Virginia</option>
                <option value="Wisconsin">Wisconsin</option>
                <option value="Wyoming">Wyoming</option>
              </select>
              <Icon icon="ic:baseline-arrow-drop-down" />
            </div>
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">36. EMPLOYEMENT STATUS</div>
          <div className="formdata-input">
            <label>
              <input
                className="radio__input"
                type="radio"
                name="employementStatus"
                onChange={onChangeHandler}
                value="Freelancer"
                checked={formData.employementStatus === "Freelancer"}
                required
              />
              Freelancer
            </label>
            <label>
              <input
                className="radio__input"
                type="radio"
                name="employementStatus"
                onChange={onChangeHandler}
                value="Employed"
                checked={formData.employementStatus === "Employed"}
                required
              />
              Employed
            </label>
            <label>
              <input
                className="radio__input"
                type="radio"
                name="employementStatus"
                onChange={onChangeHandler}
                value="Unemployed"
                checked={formData.employementStatus === "Unemployed"}
                required
              />
              Unemployed
            </label>
            <label>
              <input
                className="radio__input"
                type="radio"
                name="employementStatus"
                onChange={onChangeHandler}
                value="Self Employed"
                checked={formData.employementStatus === "Self Employed"}
                required
              />
              Self Employed
            </label>
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">37. OCCUPATION</div>
          <div className="formdata-input">
            <input
              type="text"
              name="occupation"
              onChange={onChangeHandler}
              value={formData.occupation}
              placeholder="Your answer"
              required
            />
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">38. ORGANIZATION</div>
          <div className="formdata-input">
            <input
              type="text"
              name="organization"
              onChange={onChangeHandler}
              value={formData.organization}
              placeholder="Your answer"
              required
            />
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">38. ORGANIZATION ADDRESS</div>
          <div className="formdata-input">
            <input
              type="text"
              name="organizationAddress"
              onChange={onChangeHandler}
              value={formData.organizationAddress}
              placeholder="Your answer"
              required
            />
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">39. HAVE YOU FILED THE GOVERNMENT  TAX- REFUND SERVICE THIS YEAR?</div>
          <div className="formdata-input">
            <label>
              <input
                className="radio__input"
                type="radio"
                name="haveYouFiledTheGovernmentTaxRefundServiceThisYear"
                onChange={onChangeHandler}
                value="No"
                checked={
                  formData.haveYouFiledTheGovernmentTaxRefundServiceThisYear ===
                  "No"
                }
                required
              />
              No
            </label>
            <label>
              <input
                className="radio__input"
                type="radio"
                name="haveYouFiledTheGovernmentTaxRefundServiceThisYear"
                onChange={onChangeHandler}
                value="Maybe"
                checked={
                  formData.haveYouFiledTheGovernmentTaxRefundServiceThisYear ===
                  "Maybe"
                }
                required
              />
              Maybe
            </label>
            <label>
              <input
                className="radio__input"
                type="radio"
                name="haveYouFiledTheGovernmentTaxRefundServiceThisYear"
                onChange={onChangeHandler}
                value="Yes"
                checked={
                  formData.haveYouFiledTheGovernmentTaxRefundServiceThisYear ===
                  "Yes"
                }
                required
              />
              Yes
            </label>
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">
            40. ELIGIBILITY EFFECTIVE DATE{" "}
            <div className="slant">(YYYYMMDD)</div>
          </div>
          <div className="formdata-input">
            <input
              type="text"
              name="eligibilityEffectiveDate"
              onChange={onChangeHandler}
              value={formData.eligibilityEffectiveDate}
              placeholder="Your answer"
              required
            />
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">
            41. ELIGIBILITY EXPIRATION DATE
            <div className="slant">(YYYYMMDD)</div>
          </div>
          <div className="formdata-input">
            <input
              type="text"
              name="eligibilityExpirationDate"
              onChange={onChangeHandler}
              value={formData.eligibilityExpirationDate}
              placeholder="Your answer"
              required
            />
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">42. SIGNATURE</div>
          <div className="formdata-input">
            <input
              type="text"
              name="signature"
              onChange={onChangeHandler}
              value={formData.signature}
              placeholder="Example: Jon Doe"
              required
            />
          </div>
        </div>
        <div className="formdata-group">
          <div className="form3-label">
            43. DATE ISSUED <div className="slant">(YYYYMMDD)</div>
          </div>
          <div className="formdata-input">
            <input
              type="text"
              name="dateIssued"
              onChange={onChangeHandler}
              value={formData.dateIssued}
              placeholder="Your answer"
              required
            />
          </div>
        </div>
        <div className="formdata-group">
          <div className="disclosure">AGENCY DISCLOSURE NOTICE </div>
          <p className="disclosure-info">
            The public reporting burden for this collection of information is
            estimated to average 3 minutes per response, including the time for
            reviewing instructions, searching existing data sources, gathering
            and maintaining the data needed, and completing and reviewing the
            collection of information. Send comments regarding this burden
            estimate or any other aspect of this collection of information,
            including suggestions for reducing the burden, to the Department of
            Defense, Washington Headquarters Services, at
            whd.mc-alex.esd.mbx.dd-dod-information-collections@mail.mil.
            Respondents should be aware that notwithstanding any other provision
            of law, no person shall be subject to any penalty for failing to
            comply with a collection of information if it does not display a
            currently valid OMB control number.
          </p>
          <div className="caution">
            <span>
              PLEASE DO NOT RETURN YOUR COMPLETED FORM TO THE ABOVE
              ORGANIZATION.
            </span>
            <span>
              RETURN COMPLETED FORM TO A REAL-TIME AUTOMATED PERSONNEL
              IDENTIFICATION SYSTEM WORK STATION.
            </span>
          </div>
        </div>
        <div className="formdata-group">
          <div className="privacy">PRIVACY ACT STATEMENT</div>
          <ul className="privacy-list">
            <li>
              <strong>AUTHORITY:</strong>10 U.S.C. Chapter 53, Miscellaneous
              Rights and Benefits; 10 U.S.C. Chapter 54, Commissary and Exchange
              Benefits; 50 U.S.C. Chapter 23, Internal Security; DoD Instruction
              1341.2, Defense Enrollment Eligibility Reporting System (DEERS)
              Procedures; Homeland Security Presidential Directive 12, Policy
              for a Common Identification Standard for Federal Employees and
              Contractors; and E.O. 9397 (SSN), as amended.
            </li>
            <li>
              <strong>PRINCIPAL PURPOSE(S):</strong>To apply for and enroll in
              the Defense Enrollment Eligibility Reporting System (DEERS) for
              DoD benefits and privileges. These benefits and privileges
              include, but are not limited to, medical coverage, DoD
              Identification Cards, access to DoD installations, buildings or
              facilities, and access to DoD computer systems and networks.
            </li>
            <li>
              <strong>ROUTINE USE(S):</strong>To Federal and State agencies and
              private entities; individual providers of care, and others, on
              matters relating to claim adjudication, program abuse, utilization
              review; professional quality assurance; medical peer review,
              program integrity, third party liability, coordination of benefits
              and civil and criminal litigation, and access to Federal
              government and contractor facilities, computer systems, networks,
              and controlled areas. The DD Form 1172-2 currently covers the RUs
              that would include retirees and dependents. To the Department of
              Health and Human Services, the Department of Veterans Affairs, the
              Social Security Administration, and to other Federal, state, and
              local government agencies to identify individuals having benefit
              eligibility in another plan or program. Additional Routine Uses
              can be found in system of records notice DMDC 02
            </li>
          </ul>
          <p className="privacy-info">
            The public reporting burden for this collection of information is
            estimated to average 3 minutes per response, including the time for
            reviewing instructions, searching existing data sources, gathering
            and maintaining the data needed, and completing and reviewing the
            collection of information. Send comments regarding this burden
            estimate or any other aspect of this collection of information,
            including suggestions for reducing the burden, to the Department of
            Defense, Washington Headquarters Services, at
            whd.mc-alex.esd.mbx.dd-dod-information-collections@mail.mil.
            Respondents should be aware that notwithstanding any other provision
            of law, no person shall be subject to any penalty for failing to
            comply with a collection of information if it does not display a
            currently valid OMB control number.
          </p>
        </div>
        <div className="Form3_navigation">
          <button onClick={previousHandler}>Back</button>
          <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};
