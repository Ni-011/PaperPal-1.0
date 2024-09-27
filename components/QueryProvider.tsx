"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

type props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const QueryProvider = ({ children }: props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
