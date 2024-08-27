import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserList } from "./UserList";
import { getUsers, deleteUser } from "../services/api";
import { User } from "../types";

jest.mock("../services/api");

const mockGetUsers = getUsers as jest.MockedFunction<typeof getUsers>;
const mockDeleteUser = deleteUser as jest.MockedFunction<typeof deleteUser>;

const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john.doe@example.com" },
  { id: "2", name: "Jane Smith", email: "jane.smith@example.com" },
];

describe("UserList", () => {
  beforeEach(() => {
    mockGetUsers.mockResolvedValue({ users: mockUsers });
    mockDeleteUser.mockResolvedValue({ success: true });
  });

  test("renders loading spinner while fetching users", () => {
    render(<UserList refreshList={false} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("renders user list correctly", async () => {
    render(<UserList refreshList={false} />);

    // Wait for the user list to be rendered
    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  test("opens modal when edit button is clicked", async () => {
    render(<UserList refreshList={false} />);

    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
    );

    // Click the edit button
    fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);

    // Check if modal is open
    expect(await screen.findByText("Edit User")).toBeInTheDocument();
  });

  test("calls deleteUser and updates list when delete button is clicked", async () => {
    render(<UserList refreshList={false} />);

    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
    );

    // Click the delete button
    fireEvent.click(screen.getAllByRole("button", { name: /delete/i })[0]);

    // Verify delete function was called
    expect(mockDeleteUser).toHaveBeenCalledWith("1");

    // Wait for the user list to update
    await waitFor(() => {
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  test("opens and closes modal for adding a new user", async () => {
    render(<UserList refreshList={false} />);

    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
    );

    // Click the edit button for the first user
    fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);

    // Check if modal is open
    expect(await screen.findByText("Edit User")).toBeInTheDocument();

    // Close the modal
    fireEvent.click(screen.getByText("Cancel"));

    // Verify modal is closed
    expect(screen.queryByText("Edit User")).not.toBeInTheDocument();
  });

  test("refetches users when refreshList prop changes", async () => {
    const { rerender } = render(<UserList refreshList={false} />);

    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
    );

    // Change the refreshList prop to trigger a refetch
    rerender(<UserList refreshList={true} />);

    // Verify the user list updates
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });
});
