import axios from "axios";
import { FormEvent, useState } from "react";
import OrderSummary from "@/components/booking/OrderSummary";
import CancellationPolicy from "@/components/booking/CancellationPolicy";

export default function BookingPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validate = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.cardNumber ||
      !formData.expirationDate ||
      !formData.cvv ||
      !formData.billingAddress
    ) {
      return "Please fill in all required fields.";
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const validationError = validate();
    if (validationError) {
      setLoading(false);
      setError(validationError);
      return;
    }

    try {
      await axios.post("/api/bookings", formData);
      setSuccess("Booking confirmed!");
    } catch (err) {
      setError("Failed to submit booking.");
    } finally {
      setLoading(false);
    }
  };

  const bookingDetails = {
    propertyName: "Villa Arrecife Beach House",
    price: 7500,
    bookingFee: 65,
    totalNights: 3,
    startDate: "24 August 2024",
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">Contact Detail</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>First Name</label>
                  <input
                    type="text"
                    className="border p-2 w-full mt-2"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, firstName: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="border p-2 w-full mt-2"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, lastName: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    className="border p-2 w-full mt-2"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, email: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className="border p-2 w-full mt-2"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        phoneNumber: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <h2 className="text-xl font-semibold mt-6">Pay with</h2>
              <div className="mt-4">
                <label>Card Number</label>
                <input
                  type="text"
                  className="border p-2 w-full mt-2"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      cardNumber: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label>Expiration Date</label>
                  <input
                    type="text"
                    className="border p-2 w-full mt-2"
                    value={formData.expirationDate}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        expirationDate: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label>CVV</label>
                  <input
                    type="text"
                    className="border p-2 w-full mt-2"
                    value={formData.cvv}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, cvv: e.target.value }))
                    }
                  />
                </div>
              </div>

              <h2 className="text-xl font-semibold mt-6">Billing Address</h2>
              <div className="mt-4">
                <label>Street Address</label>
                <input
                  type="text"
                  className="border p-2 w-full mt-2"
                  value={formData.billingAddress}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      billingAddress: e.target.value,
                    }))
                  }
                />
              </div>

              <button
                type="submit"
                className="mt-6 bg-green-500 text-white py-2 px-4 rounded-md w-full"
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm & Pay"}
              </button>
              {error && <p className="mt-2 text-red-500">{error}</p>}
              {success && <p className="mt-2 text-green-600">{success}</p>}
            </form>
          </div>
          <CancellationPolicy />
        </div>
        <OrderSummary bookingDetails={bookingDetails} />
      </div>
    </div>
  );
}

