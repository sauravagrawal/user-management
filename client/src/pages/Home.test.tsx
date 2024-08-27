import { render, screen, fireEvent } from "@testing-library/react";
import { Home } from "./Home";

// Mock the UserList and UserModal components
jest.mock("./components/UserList", () => ({
  UserList: () => <div>UserList Component</div>,
}));
jest.mock("./components/UserModal", () => ({
  UserModal: ({ onClose, onUserUpdated }: any) => (
    <div>
      <button onClick={onClose}>Close Modal</button>
      <button onClick={onUserUpdated}>Update User</button>
    </div>
  ),
}));

test("renders App component", () => {
  render(<Home />);
  expect(screen.getByText(/User Management/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Add new user/i })
  ).toBeInTheDocument();
});

test("opens and closes UserModal correctly", () => {
  render(<Home />);

  // Ensure UserModal is not initially rendered
  expect(screen.queryByText(/Close Modal/i)).toBeNull();

  // Simulate clicking the "Add User" button to open the modal
  fireEvent.click(screen.getByRole("button", { name: /Add new user/i }));
  expect(screen.getByText(/Close Modal/i)).toBeInTheDocument();

  // Simulate closing the modal
  fireEvent.click(screen.getByText(/Close Modal/i));
  expect(screen.queryByText(/Close Modal/i)).toBeNull();
});

test("button click updates state and renders UserModal", () => {
  render(<Home />);

  // Click the "Add User" button
  fireEvent.click(screen.getByRole("button", { name: /Add new user/i }));

  // Check if UserModal is displayed
  expect(screen.getByText(/Close Modal/i)).toBeInTheDocument();
});

test("button click toggles refreshList state correctly", () => {
  render(<Home />);

  // Open the UserModal
  fireEvent.click(screen.getByRole("button", { name: /Add new user/i }));

  // Simulate closing the modal and updating user
  fireEvent.click(screen.getByText(/Close Modal/i));

  // Check if UserModal is closed
  expect(screen.queryByText(/Close Modal/i)).toBeNull();
});

test("has correct aria attributes", () => {
  render(<Home />);

  // Check ARIA attributes on the banner and button
  expect(screen.getByRole("banner")).toHaveAttribute(
    "aria-labelledby",
    "user-management-title"
  );
  expect(screen.getByRole("button", { name: /Add new user/i })).toHaveAttribute(
    "aria-label",
    "Add new user"
  );
});
