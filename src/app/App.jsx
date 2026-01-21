import { Toaster } from "react-hot-toast";
import { Layout } from "./Layout/layout";

function App() {
  return (
    <div>
      <Toaster position="top-center" />
      <Layout />
    </div>
  );
}

export default App;
