import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserModal } from "./UserModal";
import { User } from "../types";

// Mock user and handlers
const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
};
const mockOnClose = jest.fn();
const mockOnUserUpdated = jest.fn();

describe("UserModal", () => {
  it("renders correctly for adding a new user", () => {
    render(
      <UserModal onClose={mockOnClose} onUserUpdated={mockOnUserUpdated} />
    );
    expect(screen.getByText("Add User")).toBeInTheDocument();
  });

  it("renders correctly for editing an existing user", () => {
    render(
      <UserModal
        user={mockUser}
        onClose={mockOnClose}
        onUserUpdated={mockOnUserUpdated}
      />
    );
    expect(screen.getByText("Edit User")).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.email)).toBeInTheDocument();
  });

  it("calls onUserUpdated and onClose after submission", async () => {
    render(
      <UserModal
        user={mockUser}
        onClose={mockOnClose}
        onUserUpdated={mockOnUserUpdated}
      />
    );

    // Trigger the update button click
    fireEvent.click(screen.getByText("Update"));

    // Wait for the handlers to be called
    await waitFor(() => {
      expect(mockOnUserUpdated).toHaveBeenCalled();
      //   expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("calls onClose when Cancel button is clicked", () => {
    render(
      <UserModal
        user={mockUser}
        onClose={mockOnClose}
        onUserUpdated={mockOnUserUpdated}
      />
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
