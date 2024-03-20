import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./rentStyle.css";
import { logError } from "../../../../server/src/util/logging";

const DepositPrice = ({ itemId, setRenterId, setTotalPrice, days }) => {
  const [rentalInfo, setRentalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRentalInfo = async () => {
      try {
        const response = await axios.get(
          `${process.env.BASE_SERVER_URL}/api/expense/rentPage/${itemId}`
        );
        if (response.data && response.data.depositAmount !== null) {
          setTotalPrice(
            parseFloat(response.data.price) * days +
              parseFloat(response.data.depositAmount)
          );
        }
        if (
          response.data &&
          response.data.depositAmount === "No deposit required"
        ) {
          setTotalPrice(response.data.price * days);
        }
        setRentalInfo(response.data);
        setRenterId(response.data.renterId);
      } catch (err) {
        setError("Unable to fetch rental details. Please try again later.");
        logError("Error fetching rental details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRentalInfo();
  }, [itemId, setRenterId, setTotalPrice, days]);

  if (loading) return <div>Loading rental details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!rentalInfo) return <div>No rental details available.</div>;

  return (
    <div>
      <p>Total Price: {(rentalInfo.price * days).toFixed(2)}</p>{" "}
      <p>
        Deposit Amount:{" "}
        {rentalInfo.depositRequired
          ? rentalInfo.depositAmount
          : "No deposit required"}
      </p>
    </div>
  );
};

DepositPrice.propTypes = {
  itemId: PropTypes.string.isRequired,
  setRenterId: PropTypes.func.isRequired,
  setTotalPrice: PropTypes.func.isRequired,
  days: PropTypes.number.isRequired,
};

export default DepositPrice;
