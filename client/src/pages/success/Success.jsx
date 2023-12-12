import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.post(`/orders/${id}`,{
          userId:JSON.parse(localStorage.getItem("currentUser"))?._id
        });
        setTimeout(() => {
          navigate("/orders");
        }, 4000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  return (
    <div>
      Booked Successfull. You are being redirected to the orders page. Please do
      not close the page
    </div>
  );
};

export default Success;
