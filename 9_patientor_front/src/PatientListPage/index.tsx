import React from "react";
import axios from "axios";
import { Box, Table, Button, TableHead, Typography } from "@material-ui/core";

import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";
import { useState } from 'react';
import { TableCell } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import PatientPage from "../PatientPage";

const PatientListPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [ current, setCurrent ] = useState("");

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const checkCurrentState = (id: string) => {
    const state = Object.entries(patients);

    state.map(patient => {
      if(id === patient[0]) {
        if (Object.keys(patient[1]).includes("entries")) {
          setCurrent(id);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          fetchPatientData(id);
        }
      }});
  };

  const fetchPatientData = async (id: string) => {
      try {
        const { data: patientData } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${String(id)}`
        );
        dispatch({ type: "INDIVIDUAL_PATIENT_DATA", payload: patientData });
      } catch (e) {
        console.error(e);
      }
      setCurrent(id);
    };
  
  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );
      dispatch({ type: "ADD_PATIENT", payload: newPatient });
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };
  
  if (current) {
    return (
      <div>
        <PatientPage id={current}/>
      </div>
    );
  }

  return (
    <div className="App">
      <Box>
        <Typography align="center" variant="h6">
          Patient list
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(patients).map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell><Button onClick={() => checkCurrentState(patient.id)}>{patient.name}</Button></TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>
                <HealthRatingBar showText={false} rating={1} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientListPage;
