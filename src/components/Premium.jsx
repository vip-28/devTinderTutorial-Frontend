import axios from "axios";
import { BASE_URL } from "../Utils/constants";
import SquishyCard from "../Utils/testing";
import { useEffect, useState } from "react";

export const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });

    if (res.data.isPremium) {
      setIsUserPremium(!isUserPremium);
    }
  };

  const handleBuy = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId, // Replace with your Razorpay key_id
      amount,
      currency,
      name: "Dev Tinder",
      description: "Connect to other Devs",
      order_id: orderId, // This is the order_id created in the backend
      prefill: {
        name: notes.firstName + " + " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };

    // this should open razorpay dialogue
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isUserPremium ? (
    <div>Already Premium</div>
  ) : (
    <div className="grid grid-cols-2 ">
      <div className="flex justify-center mt-14 gap-10  h-[64vh]">
        <div className="divider divider-horizontal "></div>

        <div className="card card-compact bg-base-100 w-96 shadow-xl">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Silver Membership</h2>
            <p className="grid grid-flow-row gap-2 ">
              <div>- Chat with other people </div>
              <div>- Blue Tick</div>
              <div>- 100 connection requests per day</div>
              <div>- Validity of 6 months</div>
            </p>

            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => handleBuy("gold")}
              >
                Buy Silver
              </button>
            </div>
          </div>
        </div>
        <div className="divider divider-horizontal "></div>
      </div>

      <div className="flex justify-center mt-14 gap-10  h-[64vh]">
        <div className="divider divider-horizontal "></div>

        <div className="card card-compact bg-base-100 w-96 shadow-xl">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Gold Membership</h2>
            <p className="grid grid-flow-row gap-2 ">
              <div>- Chat with other people </div>
              <div>- Golden Tick</div>
              <div>- Unlimited connection requests per day</div>
              <div>- LifeTime Membership</div>
            </p>

            <div className="card-actions justify-end">
              <button
                className="btn btn-secondary"
                onClick={() => handleBuy("gold")}
              >
                Buy Gold
              </button>
            </div>
          </div>
        </div>
        <div className="divider divider-horizontal "></div>
      </div>
    </div>
  );
};
