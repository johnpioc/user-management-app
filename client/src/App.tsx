import UserTable from "./components/UserTable";
import Actions from "./components/Actions";
import UserBar from "./components/UserBar";
import PageSelect from "./components/PageSelect";

export default function App() {
    return (
        <div className="bg-slate-100 h-screen w-screen flex flex-col justify-center items-center
            overflow-hidden">
            <Actions/>
            <UserTable />
            <PageSelect />

            <UserBar />
        </div>
    );
}