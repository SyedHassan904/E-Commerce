import "./singleOrderProgress.css";
import React, { useMemo } from "react";
import CheckIcon from "@mui/icons-material/Check";

export default function SingleOrderProgress({ orderStatus }) {
    // Define all order steps in sequence
    const steps = useMemo(() => [
        { label: "Placed", key: "placed" },
        { label: "Order Confirmed", key: "confirmed" },
        { label: "Shipped", key: "shipped" },
        { label: "Out For Delivery", key: "outForDelivery" },
        { label: "Delivered", key: "delivered" },
    ], []);

    // Determine which step is current based on order status
    const currentStep = useMemo(() => {
        switch (orderStatus) {
            case "placed":
                return 1;
            case "confirmed":
                return 2;
            case "shipped":
                return 3;
            case "outForDelivery":
                return 4;
            case "delivered":
                return 5;
            default:
                return 0; // default fallback (placed)
        }
    }, [orderStatus]);

    return (
        <div className="singleOrderProgressSection">
            <div className="singleOrderProgressTrack">
                <div className="singleOrderProgressBaseLine" />
                <div
                    className="singleOrderProgressFillLine"
                    style={{
                        width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                    }}
                />
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isCurrent = stepNumber === currentStep;

                    return (
                        <div key={step.key} className="singleProgressWidget">
                            <div
                                className={`sinOrdProIcon ${
                                    isCompleted ? "completed" : ""
                                } ${isCurrent ? "current" : ""}`}
                            >
                                {isCompleted || isCurrent ? (
                                    <CheckIcon fontSize="small" />
                                ) : (
                                    <span>{stepNumber}</span>
                                )}
                            </div>
                            <p>{step.label}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
