import { RouterProvider } from "@tanstack/react-router";
import { queryClient } from "./queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
