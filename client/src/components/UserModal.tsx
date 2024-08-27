import React, { useState, useEffect, ChangeEvent } from "react";
import { addUser, updateUser } from "../services/api";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { User } from "../types";

interface UserModalProps {
  onClose: () => void;
  onUserUpdated: () => void;
  user?: User | null;
}

export const UserModal: React.FC<UserModalProps> = ({
  onClose,
  onUserUpdated,
  user,
}) => {
  const [name, setName] = useState<string>(user?.name || "");
  const [email, setEmail] = useState<string>(user?.email || "");

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      await updateUser(user.id, name, email);
    } else {
      await addUser(name, email);
    }
    onUserUpdated();
    onClose();
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [user]);

  return (
    <Dialog
      open
      onClose={onClose}
      aria-labelledby="user-modal-title"
      aria-describedby="user-modal-description"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="user-modal-title">
          {user ? "Edit User" : "Add User"}
        </DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            required={true}
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-required
            aria-label="Name"
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            required={true}
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-required
            aria-label="Email"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} type="button" aria-label="Cancel">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            aria-label={user ? "Update user" : "Add user"}
          >
            {user ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
