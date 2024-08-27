import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Container,
  Typography,
  IconButton,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { getUsers, deleteUser } from "../services/api";
import { User } from "../types";
import { UserModal } from "./UserModal";

interface UserListProps {
  refreshList: boolean;
}

export const UserList: React.FC<UserListProps> = ({ refreshList }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersData = await getUsers();
      setUsers(usersData.users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshList]);

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteUser(id);
      if (result.success) {
        setUsers(users.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = async () => {
    setEditingUser(null);
    setIsModalOpen(false);
    fetchUsers();
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 250,
      sortable: true,
      filterable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      sortable: true,
      filterable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <div>
          <IconButton
            color="primary"
            title="Edit"
            aria-label="Edit"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            title="Delete"
            aria-label="Delete"
            onClick={() => handleDelete(params.row.id)}
            style={{ marginLeft: 8 }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="md">
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            User List
          </Typography>
          <Box sx={{ width: "100%" }}>
            <DataGrid
              rows={users}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 20, 30]}
              checkboxSelection={false}
              aria-label="User List Data Grid"
            />
          </Box>
          {isModalOpen && (
            <UserModal
              user={editingUser}
              onClose={handleModalClose}
              onUserUpdated={handleModalClose}
            />
          )}
        </CardContent>
      </Card>
    </Container>
  );
};
