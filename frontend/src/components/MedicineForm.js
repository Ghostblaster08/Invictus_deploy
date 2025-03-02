import React, { useState } from "react";

const MedicineForm = ({ patientId }) => {
  const [medicationDetails, setMedicationDetails] = useState({
    medicationId: "",
    name: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
    instructions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicationDetails({
      ...medicationDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle the API call to add the medicine for the patient
    console.log("Medicine added for patient:", patientId);
    console.log(medicationDetails);
  };

  return (
    <div className="medicine-form">
      <h3>Add Medicine for Patient ID: {patientId}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Medication ID:
          <input
            type="text"
            name="medicationId"
            value={medicationDetails.medicationId}
            onChange={handleChange}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={medicationDetails.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Dosage:
          <input
            type="text"
            name="dosage"
            value={medicationDetails.dosage}
            onChange={handleChange}
          />
        </label>
        <label>
          Frequency:
          <input
            type="text"
            name="frequency"
            value={medicationDetails.frequency}
            onChange={handleChange}
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={medicationDetails.startDate}
            onChange={handleChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={medicationDetails.endDate}
            onChange={handleChange}
          />
        </label>
        <label>
          Instructions:
          <textarea
            name="instructions"
            value={medicationDetails.instructions}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
};

export default MedicineForm;
