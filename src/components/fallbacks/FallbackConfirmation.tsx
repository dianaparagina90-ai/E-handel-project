import { useNavigate } from "react-router-dom";

const FallbackConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div
      role="alert"
      className="flex flex-col justify-center items-center gap-6 w-[60%] h-96 p-2 m-auto skrink-0"
    >
      <p className="text-red-600 font-display text-4xl text-center">
        Betalningen gick inte genom. Vänligen försök igen
      </p>
      <button
        onClick={() => navigate("/")}
        className="w-50 py-3.5 mt-3 text-xs tracking-widest uppercase mb-2 transition-opacity hover:opacity-80"
        style={{
          background: "var(--accent)",
          color: "var(--accent-foreground)",
        }}
      >
        Börja handla
      </button>
    </div>
  );
};

export default FallbackConfirmation;
