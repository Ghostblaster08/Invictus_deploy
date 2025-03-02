import React, { useState, useEffect } from "react";
import "../styles/Tracker.css";
import { createMedication, addDoctor, addCaretaker } from "./api";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import medicinesData from "../data/medicines.json"; // Import the JSON data directly

// Tracker Component
const Tracker = () => {
  const [medicines, setMedicines] = useState(medicinesData); // Set the initial state from imported data
  const [doctors, setDoctors] = useState([]);
  const [caretakers, setCaretakers] = useState([]);
  const [showMedicineForm, setShowMedicineForm] = useState(false);
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [showCaretakerForm, setShowCaretakerForm] = useState(false);
  const [newMedicine, setNewMedicine] = useState("");
  const [newDoctor, setNewDoctor] = useState("");
  const [newCaretaker, setNewCaretaker] = useState("");
  const [frequency, setFrequency] = useState(1);
  const [times, setTimes] = useState([""]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newMedicineImage, setNewMedicineImage] = useState(null);

  // Medicine Handling
  const handleAddMedicine = async () => {
    if (!newMedicine.trim()) return;

    const newMed = {
      ID: newMedicine.toLowerCase().replace(" ", "_"),  // Ensure ID is unique
      Name: newMedicine,
      Dosage: "10mg",  // Hardcoded for now; can be customized
      Frequency: `${frequency}x daily`,
      StartDate: "2025-01-15",
      EndDate: "2025-07-15",
      Instructions: "Take with water in the morning", // Default instruction
      PatientID: "patient1", // Example patient ID, replace with dynamic data
      DoctorID: "doctor1", // Example doctor ID, replace with dynamic data
      Status: "active",
      ImageURL: newMedicineImage || "" // Handle case where image may not be uploaded
    };

    // Call the backend to create a new medication
    const createdMedicine = await createMedication(newMed);
    setMedicines([...medicines, createdMedicine]);
    setNewMedicine("");
    setFrequency(1);
    setTimes([""]);
    setNewMedicineImage(null);
    setShowMedicineForm(false);
  };

  const handleFrequencyChange = (e) => {
    const freq = parseInt(e.target.value);
    setFrequency(freq);
    setTimes(Array(freq).fill("")); // Set frequency based on times per day
  };

  const handleTimeChange = (index, value) => {
    const updatedTimes = [...times];
    updatedTimes[index] = value;
    setTimes(updatedTimes);
  };

  const removeMedicine = async (index) => {
    const medicine = medicines[index];
    // Call to delete medication via API (to be implemented in the backend)
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file); // Local file URL for simplicity
      setNewMedicineImage(imageURL); // Store the image URL in state
    }
  };

  // Doctor Handling
  const handleAddDoctor = async () => {
    if (!newDoctor.trim()) return;
    const addedDoctor = await addDoctor(newDoctor);
    setDoctors([...doctors, addedDoctor]);
    setNewDoctor("");
    setShowDoctorForm(false);
  };

  const removeDoctor = (index) => {
    setDoctors(doctors.filter((_, i) => i !== index));
  };

  // Caretaker Handling
  const handleAddCaretaker = async () => {
    if (!newCaretaker.trim()) return;
    const addedCaretaker = await addCaretaker(newCaretaker);
    setCaretakers([...caretakers, addedCaretaker]);
    setNewCaretaker("");
    setShowCaretakerForm(false);
  };

  const removeCaretaker = (index) => {
    setCaretakers(caretakers.filter((_, i) => i !== index));
  };

  return (
    <div className="tracker-container">
      <div className="tracker-left">
        {/* Medicines Section */}
        <div className="tracker-section">
          <h3>Current Medications</h3>
          <button onClick={() => setShowMedicineForm(true)}>Add Medicine</button>
          <ul>
            {medicines.map((med, index) => (
              med && med.Name ? (
                <li key={index}>
                  <strong>{med.Name}</strong> - {med.Frequency} daily
                  {/* Display the medication image */}
                  {med.ImageURL && (
                    <img
                      src={med.ImageURL}
                      alt={med.Name}
                      className="medicine-image"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  )}
                  <ul>
                    {times.map((time, i) => (
                      <li key={i}>🕒 {time}</li>
                    ))}
                  </ul>
                  <button className="remove-btn" onClick={() => removeMedicine(index)}>Remove</button>
                </li>
              ) : null
            ))}
          </ul>
        </div>

        {/* Doctors Section */}
        <div className="tracker-section">
          <h3>Current Doctors</h3>
          <button onClick={() => setShowDoctorForm(true)}>Add Doctor</button>
          <ul>
            {doctors.map((doctor, index) => (
              <li key={index}>
                {doctor} <button className="remove-btn" onClick={() => removeDoctor(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Caretakers Section */}
        <div className="tracker-section">
          <h3>Current Caretakers</h3>
          <button onClick={() => setShowCaretakerForm(true)}>Add Caretaker</button>
          <ul>
            {caretakers.map((caretaker, index) => (
              <li key={index}>
                {caretaker} <button className="remove-btn" onClick={() => removeCaretaker(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="tracker-right">
        <h3>Timeline</h3>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="react-calendar"
          tileClassName="calendar-tile"
        />
      </div>

      {/* Medicine Form Popup */}
      {showMedicineForm && (
        <div className="popup">
          <div className="popup-content">
            <input
              type="text"
              value={newMedicine}
              onChange={(e) => setNewMedicine(e.target.value)}
              placeholder="Enter medicine name"
            />
            <label>Frequency (Times per day):</label>
            <select value={frequency} onChange={handleFrequencyChange}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
            {times.map((time, index) => (
              <input
                key={index}
                type="time"
                value={time}
                onChange={(e) => handleTimeChange(index, e.target.value)}
              />
            ))}
            <label>Upload Medicine Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {/* Display the uploaded image preview */}
            {newMedicineImage && <img src={newMedicineImage} alt="Medicine preview" className="medicine-image-preview" />}
            <button onClick={handleAddMedicine}>Save</button>
            <button onClick={() => setShowMedicineForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Doctor Form Popup */}
      {showDoctorForm && (
        <div className="popup">
          <div className="popup-content">
            <input
              type="text"
              value={newDoctor}
              onChange={(e) => setNewDoctor(e.target.value)}
              placeholder="Enter doctor's name"
            />
            <button onClick={handleAddDoctor}>Save</button>
            <button onClick={() => setShowDoctorForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Caretaker Form Popup */}
      {showCaretakerForm && (
        <div className="popup">
          <div className="popup-content">
            <input
              type="text"
              value={newCaretaker}
              onChange={(e) => setNewCaretaker(e.target.value)}
              placeholder="Enter caretaker's name"
            />
            <button onClick={handleAddCaretaker}>Save</button>
            <button onClick={() => setShowCaretakerForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracker;
