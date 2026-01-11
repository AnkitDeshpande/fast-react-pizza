import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useActionData, useNavigation } from "react-router";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import { getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { fetchAddress } from "../user/userSlice";

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigate = useNavigation();
  const isSubmiting = navigate.state === "submitting";
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const dispatch = useDispatch();
  const formErrors = useActionData();
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const total = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            required
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>

          <div className="grow">
            <div className="relative grow">
              <input
                className="input w-full pr-32"
                type="text"
                name="address"
                disabled={isLoadingAddress}
                defaultValue={address}
                required
              />
              {addressStatus === "error" && (
                <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                  {errorAddress}
                </p>
              )}
            </div>

            {!position.latitude && !position.longitude && (
              <span className="absolute top-1/2 right-2 -translate-y-1/2">
                <Button
                  type="small"
                  disabled={isLoadingAddress}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  Use Location
                </Button>
              </span>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={() => setWithPriority(!withPriority)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <Button type="primary" disabled={isSubmiting || isLoadingAddress}>
            {isSubmiting
              ? "Placing Order ...."
              : `Order now from ${formatCurrency(total)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
