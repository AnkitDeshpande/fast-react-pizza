import { Link } from "react-router";

const Button = ({ children, disabled, to, type, onClick }) => {
  const base =
    "transition-colors-300 text-sm inline-block rounded-full bg-yellow-400 font-semibold tracking-wide text-stone-800 uppercase hover:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed";

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-2 md:px-5 md:py-2.5",
    round: base + " px-2.5 py-1 md:px-3.5 md:py2 text-sm",
    secondary:
      "transition-colors-300 text-sm inline-block rounded-full bg-transparent border-2 border-stone-300 font-semibold tracking-wide text-stone-400 transition-colors duration-300 uppercase hover:text-stone-800 focus:text-stone-800 hover:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2  disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick) {
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
};

export default Button;
