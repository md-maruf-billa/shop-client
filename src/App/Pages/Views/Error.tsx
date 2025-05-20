import CustomButton from "@/App/Components/Customs/CustomButton";
import { Link } from "react-router";

const Error = () => {
      return (
            <div className="error-page">

                  <div className="flex flex-col items-center gap-5 p-8 backdrop-blur-lg bg-brandSecondary/20">
                        <h1 className="text-7xl font-bold text-brandSelect">! 404 !</h1>
                        <h1 className="text-5xl font-bold text-brandTextPrimary">OPPS SORRY !!!</h1>
                        <p className="text-xl text-brandTextTertiary">Your Looking page not found !!</p>

                        <Link to="/"><CustomButton btnText="Go Back to Home" /></Link>
                  </div>

            </div>
      );
};

export default Error;