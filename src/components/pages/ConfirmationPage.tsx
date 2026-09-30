import { FaRegHeart } from "react-icons/fa";
import { useOrder } from "../../hooks/useOrder";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useEffect, useRef } from "react";

function ConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const { data: order, isPending, isError, isSuccess } = useOrder(id ?? "");
  const hasClearedCart = useRef(false);

  //Töma kundvagnen när ordern är framgångsrik och har inte redan tömt kundvagnen
  useEffect(() => {
    if (isSuccess && order && !hasClearedCart.current) {
      hasClearedCart.current = true;
      clearCart();
    }
  }, [isSuccess, clearCart]);

  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <p className="font-display text-(--accent) text-2xl italic">
        Tack för din beställning
      </p>
      <div className="flex  ">
        <h2 className="font-bold text-4xl font-display p-2">Du är en ängel</h2>
        <FaRegHeart className="ml-2 text-2xl" />
      </div>
      <p className="tracking-tight ">
        En bekräftelse har skickats till din e-postadress.
      </p>
      <p className="tracking-tight">
        Ditt paket är på väg till dig inom 3 - 5 arbetsdagar.
      </p>
      <div className="flex flex-col gap-2 p-4 border border-(--muted-foreground)">
        {isPending && <p className="font-bold">Ordern skapas...</p>}
        {isError && (
          <p className="text-red-600 font-display text-2xl">
            Betalningen gick inte genom. Vänligen försök igen
          </p>
        )}
        {isSuccess &&
          (() => {
            const customer = JSON.parse(order.customerDetails);
            return (
              <div className="flex flex-col gap-4 grow divide-y divide-(--muted-foreground) m-2 p-2">
                <div className="grid grid-cols-2 gap-2 items-center">
                  <p className="flex flex-col ">
                    ORDERNUMMER:{" "}
                    <span className="font-semibold">{order.id}</span>
                  </p>
                  <p className="flex flex-col items-end m-2">
                    Datum:{" "}
                    <span className="font-semibold">
                      {new Date(order.orderDate).toLocaleDateString("sv-SE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-2 ">
                  <h3 className="font-display underline">
                    Beställda produkter:
                  </h3>
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="grid grid-cols-[1fr_auto_auto] gap-4 p-2 ml-2"
                    >
                      <p className="italic wrap-break-word">{item.name}</p>

                      <p>{item.quantity} st</p>
                      <p>{item.price} kr</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display underline">Kunduppgifter:</h3>
                  <div className="p-2 ml-2">
                    <p className="font-display ">
                      Namn:
                      <span className="font-sans ml-2">{customer.name}</span>
                    </p>
                    <p className="font-display">
                      Adress:
                      <span className="font-sans ml-2">{customer.address}</span>
                    </p>
                  </div>
                </div>
                <p className="self-end uppercase">
                  Totalt betalt:
                  <span className="text-(--accent) font-semibold lowercase font-display text-2xl ml-1">
                    {order.totalAmount} kr
                  </span>
                </p>
              </div>
            );
          })()}
      </div>
      <button
        onClick={() => navigate("/")}
        className="w-50 py-3.5 mt-3 text-xs tracking-widest uppercase mb-2 transition-opacity hover:opacity-80"
        style={{
          background: "var(--accent)",
          color: "var(--accent-foreground)",
        }}
      >
        Fortsätt handla
      </button>
    </div>
  );
}

export default ConfirmationPage;
