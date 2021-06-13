import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  const { getByText } = render(<ContactForm />);
  const header = getByText(/Contact Form/i);
  expect(header).toBeVisible();
  expect(header).toBeInTheDocument();
  expect(header).toBeTruthy();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  //   const firstName = screen.getByLabelText(/firstName/i);
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/First Name/i);

  userEvent.type(firstNameInput, "Jose");

  const err = await screen.getAllByTestId(/error/i);
  //   console.log(err);
  //   console.log(firstNameInput);
  expect(err.length).toEqual(1);
});

test("renders THREE error messages if user enters no values into any fields.", async () => {});

render(<ContactForm />);

const buttonInput = screen.getByTestId(/submit/i);
userEvent.click(buttonInput);

const err = screen.getAllByTestId(/error/i);
expect(err.length).toEqual(3);

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/First Name*/i);
  const lastNameInput = screen.getByLabelText(/Last Name*/i);
  const emailInput = screen.getByLabelText(/Email*/i);

  userEvent.type(firstNameInput, "Breeze");
  userEvent.type(lastNameInput, "Perez Barreiro");
  userEvent.type(emailInput, "Breeze");

  const err = screen.getAllByTestId(/error/i);
  expect(err.length).toEqual(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const emailInput = screen.getByLabelText(/Email*/i);

  userEvent.type(emailInput, "Breeze");

  const err = screen.getByText(/Error: email must be a valid email address./i);

  expect(err).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/First Name*/i);

  const emailInput = screen.getByLabelText(/Email*/i);
  const messageInput = screen.getByLabelText(/Message/i);
  const buttonInput = screen.getByTestId(/submit/i);

  userEvent.type(firstNameInput, "Breeze");

  userEvent.type(emailInput, "Breeze@gmail.com");
  userEvent.type(messageInput, "loremfaaljksjdfjlkajsdlfkjal;");
  userEvent.click(buttonInput);

  const err = screen.getByText(/Error: lastName is a required field./i);
  expect(err).toBeInTheDocument();
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/First Name*/i);
  const lastNameInput = screen.getByLabelText(/Last Name*/i);
  const emailInput = screen.getByLabelText(/Email*/i);
  const messageInput = screen.getByLabelText(/Message/i);

  userEvent.type(firstNameInput, "Breeze");
  userEvent.type(lastNameInput, "Perez Barreiro");
  userEvent.type(emailInput, "Breeze@gmail.com");
  userEvent.type(messageInput, "");

  expect(firstNameInput).toBeVisible();
  expect(lastNameInput).toBeVisible();
  expect(messageInput).toBeEmpty();
  expect(emailInput).toBeVisible();
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  const firstNameInput = screen.getByLabelText(/First Name*/i);
  const lastNameInput = screen.getByLabelText(/Last Name*/i);
  const emailInput = screen.getByLabelText(/Email*/i);
  const messageInput = screen.getByLabelText(/Message/i);
  const buttonInput = screen.getByTestId(/submit/i);

  userEvent.type(firstNameInput, "Breeze");
  userEvent.type(lastNameInput, "Perez Barreiro");
  userEvent.type(emailInput, "Breeze@gmail.com");
  userEvent.type(messageInput, "loremfaaljksjdfjlkajsdlfkjal;");
  userEvent.click(buttonInput);

  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(messageInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});
