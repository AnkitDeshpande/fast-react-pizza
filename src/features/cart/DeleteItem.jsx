import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      <img src="/trash-svgrepo-com.svg" alt="Delete" className="h-4 w-4" />
    </Button>
  );
}

export default DeleteItem;
