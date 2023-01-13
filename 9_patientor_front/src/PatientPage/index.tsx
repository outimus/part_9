import { useStateValue } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";

import { Card } from "@material-ui/core";
import { Button } from "@mui/material";

import AddEntryModal from "../AddEntryModal";
import EntryDetails from "../EntryDetails";
import { useState } from 'react';
import GenderIcon from "../components/GenderIcon";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { Patient } from "../types";

const randomKey = () => {
  const x = Math.floor(Math.random() * 1000);
  return x;
};

const PatientPage = (id: { id: string; }) => {
    const [ { patients }, dispatch ] = useStateValue();
    const currentPatient = patients[id.id];

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
  };
    
  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id.id}/entries`,
        values
      );
      dispatch({ type: "ADD_ENTRY", payload: newEntry });
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

    if (currentPatient.entries) {
        return (
            <div>
                <h2>
                  {currentPatient.name}<GenderIcon gender={currentPatient.gender}/>
                </h2>
                <>ssh: {currentPatient.ssn}</><br></br>
                <>occupation: {currentPatient.occupation}</>
                <h2>entries</h2>
                {currentPatient.entries.map((e) =>
                  <Card variant="outlined" key={randomKey()}>
                    <EntryDetails  entry={e}></EntryDetails>
                  </Card>
                  )}
                <AddEntryModal
                  modalOpen={modalOpen}
                  onSubmit={submitNewEntry}
                  error={error}
                  onClose={closeModal}/>
                  <p></p>
                <Button variant="contained" color="secondary" onClick={() => openModal()}>
                  Add New Entry
                </Button>
            </div>
        );
    } else {
      return (
            <div>
                <h1>{currentPatient.name}<GenderIcon gender={currentPatient.gender}/></h1>
                <>ssh: {currentPatient.ssn}</><br></br>
                <>occupation: {currentPatient.occupation}</>
                <h2>entries</h2>
                <em>no added entries</em>
                <AddEntryModal
                  modalOpen={modalOpen}
                  onSubmit={submitNewEntry}
                  error={error}
                  onClose={closeModal}/>
                  <p></p>
                <Button variant="contained" color="secondary" onClick={() => openModal()}>
                  Add New Entry
                </Button>
            </div>
        );
    }
};

export default PatientPage;