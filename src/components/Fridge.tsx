import { appSlice } from "../redux/appSlice";
import { useAppDispatch } from "../redux/hooks";

export function Fridge() {
  const dispatach = useAppDispatch();
  const handleOpenFridge = () => {
    dispatach(appSlice.actions.setDoorState(true));
  };
  const handleCloseFridge = () => {
    dispatach(appSlice.actions.setDoorState(false));
  };
  return (
    <div data-testid="fridge">
      <button onClick={handleOpenFridge}>Open fridge door</button>
      <button onClick={handleCloseFridge}>Close fridge door</button>
    </div>
  );
}
