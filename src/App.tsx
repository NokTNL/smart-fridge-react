import { CurrentDatePicker } from "./components/CurrentDatePicker";
import { Fridge } from "./components/Fridge";
import { useAppSelector } from "./redux/hooks";

export function App() {
  const currentDate = useAppSelector((state) => state.app.currentDate);

  return (
    <>
      {currentDate === null && <CurrentDatePicker />}
      {currentDate !== null && <Fridge />}
    </>
  );
}
