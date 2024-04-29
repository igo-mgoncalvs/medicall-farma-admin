'use client'

import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import UsersForm from "@/components/usersForm";

import styles from './styles.module.css'

export default function AddUser () {

  return (
    <div>
      <p className={styles.title}>Cadastrar produto</p>

      <UsersForm />
    </div>
  )
}