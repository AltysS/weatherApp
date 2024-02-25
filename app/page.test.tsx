import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./page";
import "@testing-library/jest-dom";

// Mock useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

test("handles city input change and dropdown list opening", async () => {
  render(<Home />);

  // Вводим значение в поле ввода города
  const cityInput = screen.getByLabelText(/City/i);
  fireEvent.change(cityInput, { target: { value: "New York" } });

  // Ждем, пока выпадающий список загрузится
  await waitFor(() => {
    expect(screen.getByText("New York")).toBeInTheDocument(); // Assuming "New York" is always present in the dropdown
  });

  // Проверяем, что значение "New York" есть в выпадающем списке
  const dropdownItem = screen.getByText("New York");
  fireEvent.click(dropdownItem);

  // Кликаем на кнопку "Add city"
  const addButton = screen.getByText("Add city");
  fireEvent.click(addButton);

  // Проверяем, что выбранный город добавлен
  await waitFor(() => {
    expect(screen.getByText("New York")).toBeInTheDocument();
  });
});
