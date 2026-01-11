import { useFetcher } from "react-router";
import Button from "../../ui/Button";

function UpdateOrder() {
  const fetcher = useFetcher();

  // Use the state to see if it's currently submitting
  const isUpdating = fetcher.state === "submitting";

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary" disabled={isUpdating}>
        {isUpdating ? (
          <>
            <div className="flex flex-row gap-2">
              <div className="h-4 w-4 animate-bounce rounded-full bg-stone-500"></div>
              <div className="h-4 w-4 animate-bounce rounded-full bg-stone-500 [animation-delay:-.3s]"></div>
              <div className="h-4 w-4 animate-bounce rounded-full bg-stone-500 [animation-delay:-.5s]"></div>
            </div>
          </>
        ) : (
          "Make priority"
        )}
      </Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;
