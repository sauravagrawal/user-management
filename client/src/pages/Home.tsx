import React, { useState } from "react";
import { UserList } from "../components/UserList";
import { UserModal } from "../components/UserModal";
import { Container, Button, Typography, Box } from "@mui/material";

export const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUserUpdated = () => {
    setRefreshList((prev) => !prev);
  };

  return (
    <Container maxWidth="md">
      <Box
        m={3}
        mt={0}
        mb={0}
        p={2}
        bgcolor="primary.main"
        color="white"
        role="banner"
        aria-labelledby="user-management-title"
      >
        <Typography variant="h4" gutterBottom id="user-management-title">
          User Management
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={handleAddUser}
            aria-label="Add new user"
          >
            Add User
          </Button>
        </Box>
      </Box>
      <UserList refreshList={refreshList} />
      {isModalOpen && (
        <UserModal
          onClose={handleCloseModal}
          onUserUpdated={handleUserUpdated}
        />
      )}
    </Container>
  );
};
