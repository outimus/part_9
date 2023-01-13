import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Diagnose, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import { Typography } from "@material-ui/core";

const App = () => {
  const [ patients, dispatch] = useStateValue();
  console.log(patients);
  
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch({ type: "SET_PATIENT_LIST", payload: patientListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();

    void axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnose[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch({ type: "SET_DIAGNOSES", payload: diagnosesFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoses();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button
            href="/"
            variant="contained" 
            color="primary"
            onClick={() => console.log("How to get to the homepage?")}>
              Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;