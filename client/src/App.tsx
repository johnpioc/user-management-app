import { useState } from "react";
import { ToastContainer } from "react-toastify";

import UserTable from "./components/UserTable";
import Actions from "./components/Actions";
import UserBar from "./components/UserBar";
import PageSelect from "./components/PageSelect";
import FilterBar from "./components/FilterBar";

export default function App() {
  const [userBarOpen, setUserBarOpen] = useState<boolean>(false);

  const [filterBarOpen, setFilterBarOpen] = useState<boolean>(false);

  return (
    <div
      className="bg-slate-100 min-h-screen w-screen flex flex-col justify-center items-center
            overflow-hidden py-24 px-4 lg:px-0"
    >
      <Actions
        setFilterBarOpen={setFilterBarOpen}
        setUserBarOpen={setUserBarOpen}
      />
      <UserTable setUserBarOpen={setUserBarOpen} />
      <PageSelect />

      <UserBar userBarOpen={userBarOpen} setUserBarOpen={setUserBarOpen} />
      <FilterBar
        filterBarOpen={filterBarOpen}
        setFilterBarOpen={setFilterBarOpen}
      />
      <ToastContainer />
    </div>
  );
}
