import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { WizardScreen } from "../wizard";
import { ToastProvider, useToast } from "@/context/ToastContext";
import { formServices } from "@/services/formService";
import departmentData from "@/mocks/db/db-step1.json";
import locationData from "@/mocks/db/db-step2.json";
import {
  DepartmentsResponse,
  LocationResponse,
} from "@/services/types/formServiceTypes";
import { useRouter } from "next/router";
import { fileToBase64 } from "@/helper/file-to-base64";
import userEvent from "@testing-library/user-event";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/helper/file-to-base64", () => ({
  fileToBase64: jest.fn(),
}));

describe("Render Wizard Screen", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("Screen should render wizard step 1 with role admin", async () => {
    jest
      .spyOn(formServices, "getDepartments")
      .mockResolvedValue(departmentData as DepartmentsResponse);
    jest
      .spyOn(formServices, "submitBasicInfo")
      .mockResolvedValue({ message: "success" });

    const showToastMock = jest.fn();
    (useToast as jest.Mock).mockReturnValue({ showToast: showToastMock });

    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      query: { step: "1" },
    });

    render(
      <ToastProvider>
        <WizardScreen role="admin" step={1} />
      </ToastProvider>
    );

    expect(await screen.findByText("Step - 1"));

    const buttonNext = await screen.findByTestId("button-next");

    expect(buttonNext).toBeDisabled();

    const inputFullname = await screen.findByTestId("input-fullname");

    fireEvent.change(inputFullname, {
      target: { value: "Muhammad Haidar Dzaky" },
    });

    await waitFor(() => {
      expect(inputFullname).toHaveValue("Muhammad Haidar Dzaky");
    });

    const inputEmail = await screen.findByTestId("input-email");

    fireEvent.change(inputEmail, {
      target: { value: "test@email.com" },
    });

    await waitFor(() => {
      expect(inputEmail).toHaveValue("test@email.com");
    });

    const inputAutocompleteDepartment = await screen.findByTestId(
      "input-autocomplete-department"
    );

    fireEvent.change(inputAutocompleteDepartment, {
      target: { value: "Len" },
    });

    const optionDepartmentLending = await screen.findByText("Lending");

    fireEvent.click(optionDepartmentLending);

    await waitFor(() => {
      expect(inputAutocompleteDepartment).toHaveValue("Lending");
    });

    const inputAutocompleteRole = await screen.findByTestId(
      "input-autocomplete-role"
    );

    fireEvent.change(inputAutocompleteRole, {
      target: { value: "adm" },
    });

    const optionRoleAdmin = await screen.findByText("Admin");

    fireEvent.click(optionRoleAdmin);

    await waitFor(() => {
      expect(inputAutocompleteRole).toHaveValue("admin");
    });

    expect(await screen.findByTestId("input-employee-id")).toHaveValue(
      "LEN-001"
    );

    expect(buttonNext).toBeEnabled();

    fireEvent.click(buttonNext);

    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(formServices.submitBasicInfo).toHaveBeenCalledWith({
      department: "Lending",
      email: "test@email.com",
      employeeId: "LEN-001",
      fullName: "Muhammad Haidar Dzaky",
      role: "admin",
    });

    expect(showToastMock).toHaveBeenCalledWith(
      "success",
      "Submit basic info success!"
    );
    expect(pushMock).toHaveBeenCalledWith(
      {
        pathname: undefined,
        query: {
          step: 2,
        },
      },
      undefined,
      { shallow: true }
    );
  });
  test("Screen should render wizard step 1 with role ops should cannot access page", async () => {
    render(
      <ToastProvider>
        <WizardScreen role="ops" step={1} />
      </ToastProvider>
    );

    expect(await screen.findByText("Step - 1"));
    expect(await screen.findByText("Anda tidak bisa mengakses halaman ini"));
  });
  test("Screen should render wizard step 2 with role admin", async () => {
    const user = userEvent.setup();
    const file = new File(["dummy content"], "photo.png", {
      type: "image/png",
    });
    (fileToBase64 as jest.Mock).mockImplementation(async (file: File) => {
      // panggil onChange di WizardScreen
      return "mocked_base64";
    });

    // Mock the helper function that converts file to base64

    jest
      .spyOn(formServices, "getLocations")
      .mockResolvedValue(locationData as LocationResponse);
    jest
      .spyOn(formServices, "submitData")
      .mockResolvedValue({ message: "success" });

    const showToastMock = jest.fn();
    (useToast as jest.Mock).mockReturnValue({ showToast: showToastMock });

    const replaceMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      replace: replaceMock,
    });

    render(
      <ToastProvider>
        <WizardScreen role="admin" step={2} />
      </ToastProvider>
    );

    expect(await screen.findByText("Step - 2"));

    const buttonSubmit = await screen.findByTestId("button-submit");

    const fileInput = screen.getByTestId(
      "input-file-image"
    ) as HTMLInputElement;

    await user.upload(fileInput, file);

    const inputEmploymentType = await screen.findByTestId(
      "input-employment-type"
    );

    fireEvent.change(inputEmploymentType, {
      target: { value: "fulltime" },
    });

    await waitFor(() => {
      expect(inputEmploymentType).toHaveValue("fulltime");
    });

    const inputAutocompleteOfficeLocation = await screen.findByTestId(
      "input-autocomplete-office-location"
    );

    fireEvent.change(inputAutocompleteOfficeLocation, {
      target: { value: "Jak" },
    });

    const optionJakarta = await screen.findByText("Jakarta");

    fireEvent.click(optionJakarta);

    await waitFor(() => {
      expect(inputAutocompleteOfficeLocation).toHaveValue("Jakarta");
    });

    const inputNotes = await screen.findByTestId("input-text-area-notes");

    fireEvent.change(inputNotes, {
      target: { value: "test text area" },
    });

    await waitFor(() => {
      expect(inputNotes).toHaveValue("test text area");
    });

    fireEvent.click(buttonSubmit);

    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    expect(formServices.submitData).toHaveBeenCalledWith({
      employmentType: "fulltime",
      image: "mocked_base64",
      notes: "test text area",
      officeLocation: "Jakarta",
    });

    expect(showToastMock).toHaveBeenCalledWith(
      "success",
      "Submit detail info success!"
    );
    expect(replaceMock).toHaveBeenCalledWith("/list");
  });
});
