import { Link } from "react-router-dom";
import { Logo } from "../../assets/images";

export default function LogoHeader() {
  return (
    <div className="w-fit">
      <Link to={"/"} className="flex items-end">
        <img src={Logo} alt="logo" />
        <p className="text-white text-base font-semibold sm:block hidden">
          Cable & System Vietnam
        </p>
      </Link>
    </div>
  );
}
