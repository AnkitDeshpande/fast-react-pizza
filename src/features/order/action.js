import { redirect } from "react-router";
import { createOrder, updateOrder } from "../../services/apiRestaurant";
import store from "../../store/store";
import { clearCart } from "../cart/cartSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "please enter valid phone number";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  // DO NOT OVERUSE BECAUSE OF OPTIMISATION PERFORMANCE
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export const orderAction = async ({ params }) => {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
};
