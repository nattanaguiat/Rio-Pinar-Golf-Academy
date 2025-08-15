import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img className="w-full md:max-w-[360px]" src={assets.contactImg} alt="" />
        <div className="flex flex-col justify-center items-start  gap-6">
          <p className="font-semibold text-lg text-gray-600">
            Phone: 407-286-6920 <br /> Email: info@riogolfacademy.com{" "}
          </p>
          <p className="font-semibold text-lg text-gray-600">
            8600 El Prado Avenue <br />
            Orlando FL 32825
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
