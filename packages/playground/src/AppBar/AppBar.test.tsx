/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import AppBar from "./AppBar";
import { it, expect, describe, beforeAll } from 'vitest';
import { render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';
import mediaQuery from "css-mediaquery";
import { ITransport } from "../hooks/useTransport";

function createMatchMedia(width: any) {
  return (query: any) => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {
      // noop
    },
    removeListener: () => {
      // noop
    },
  });
}

describe("Appbar", () => {
  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth) as any;
  });
  it("renders without crashing", () => {
    render(<AppBar onTransportAdd={function (_transport: ITransport) {
      throw new Error("Function not implemented.");
    } } onTransportChange={function (_transport: ITransport) {
      throw new Error("Function not implemented.");
    } } />);
  });

  it("renders uiSchema logo", async () => {
    render(<AppBar uiSchema={{
      appBar: {
        "ui:logoUrl": "http://foo.salad",
      },
    } as any} onTransportAdd={function (_transport: ITransport) {
      throw new Error("Function not implemented.");
    } } onTransportChange={function (_transport: ITransport) {
      throw new Error("Function not implemented.");
    } } />);

    const logoImage = await screen.findByRole('img');
    expect(logoImage).toHaveAttribute('src', 'http://foo.salad');
  });

  it("renders uiSchema title", () => {
    render(<AppBar uiSchema={{
      appBar: {
        "ui:title": "foobar",
      },
    } as any} onTransportAdd={function (_transport: ITransport) {
      throw new Error("Function not implemented.");
    } } onTransportChange={function (_transport: ITransport) {
      throw new Error("Function not implemented.");
    } } />);
    expect(screen.getByText("foobar")).toBeInTheDocument();
  });

  it("renders uiSchema inputPlaceholder", () => {
    render(<AppBar uiSchema={{
      appBar: {
        "ui:input": true,
        "ui:inputPlaceholder": "enter url",
      },
    } as any} onTransportAdd={function (_transport: ITransport) {
      throw new Error("Function not implemented.");
    } } onTransportChange={function (_transport: ITransport) {
      throw new Error("Function not implemented.");
    } } />);
    expect(screen.getByPlaceholderText("enter url")).toBeInTheDocument();
  });
});
