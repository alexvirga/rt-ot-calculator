"use client";

import { calculateWorkerHours } from "./util";
import { useState } from "react";
import { TextField, Button, FormLabel, Typography } from "@mui/material";
import styles from "./page.module.css";

export default function Calculator() {
  const [RTStart, setRTStart] = useState();
  const [RTEnd, setRTEnd] = useState();
  const [totalRT, setTotalRT] = useState(0);
  const [totalOT, setTotalOT] = useState(0);
  const [IVRIn, setIVRIn] = useState();
  const [IVROut, setIVROut] = useState();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submit action
    const { RT, OT } = calculateWorkerHours(RTStart, RTEnd, IVRIn, IVROut);

    setTotalRT(RT);
    setTotalOT(OT);
  };

  return (
    <div className={styles.calculatorPage}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.form}>
            <div className={styles.inputGroup}>
              <div className={styles.input}>
                <FormLabel className={styles.inputLabel} htmlFor="IVRIn">
                  IVR In:
                </FormLabel>
                <TextField
                  placeholder="MM/DD/YYY HH:MM"
                  name="IVR In"
                  id="IVRIn"
                  onChange={(e) => setIVRIn(e.target.value)}
                />
              </div>

              <div className={styles.input}>
                <FormLabel className={styles.inputLabel} htmlFor="IVRout">
                  IVR Out:
                </FormLabel>
                <TextField
                  name="IVR Out"
                  id="IVRout"
                  placeholder="MM/DD/YYY HH:MM"
                  onChange={(e) => setIVROut(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <div className={styles.input}>
                {" "}
                <FormLabel className={styles.inputLabel} htmlFor="RTStart">
                  RT Start:
                </FormLabel>
                <TextField
                  name="RTStart"
                  id="RTStart"
                  placeholder="HH:MM"
                  onChange={(e) => setRTStart(e.target.value)}
                />
              </div>
              <div className={styles.input}>
                <FormLabel className={styles.inputLabel} htmlFor="RTEnd">
                  RT End:
                </FormLabel>
                <TextField
                  name="RTEnd"
                  id="RTEnd"
                  placeholder="HH:MM"
                  onChange={(e) => setRTEnd(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={styles.submitButton}>
            <Button type="submit"> Calculate </Button>
          </div>
        </form>
      </div>
      <div>
        <Typography>RT: {totalRT} hrs</Typography>
        <Typography>OT: {totalOT} hrs</Typography>
      </div>
    </div>
  );
}
