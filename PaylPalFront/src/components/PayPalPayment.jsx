import { PayPalButtons } from "@paypal/react-paypal-js";

// PayPalPayment component for handling PayPal payments
const PayPalPayment = (props) => {

    // Server URL where backend endpoints for PayPal operations are hosted, which is my server
    // const serverUrl = "http://localhost:8888";
    const serverUrl = "https://pay-pal-back-cfd3e94e4818.herokuapp.com";
    
    // Page data passed as props to the component
    const pageData = props.data
    
    // Function to create a PayPal order on the server
    const createOrder = () => {
        // Order is created on the server and the order id is returned
        return fetch(`${serverUrl}/my-server/create-paypal-order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Use the "body" param to pass additional order information
            // Here is passed the product and buyer information
            body: JSON.stringify({
                product: pageData.product,
                buyer: pageData.buyer
            }),
        })
        .then((response) => response.json())
        .then((order) => order.id);
    };

    // Function called when the user approves the PayPal payment
    const onApprove = async (data) => {
        // Order is captured on the server, and the response is returned to the browser
        return fetch(`${serverUrl}/my-server/capture-paypal-order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // Here is passed the orderID, that is shown at the modal
            body: JSON.stringify({
                orderID: data.orderID
            })
        })
        .then((response) => response.json())
        .then((order) => {
            // Check if the order status is "COMPLETED" and invoke the appropriate callback
            if(order.status === "COMPLETED") {
                props.onSuccess(order);
            } else {
                props.onFailed(order);
            }
        });
    };

    // Render the PayPal buttons using the PayPalButtons component
    return (
        <>
            <PayPalButtons
                disabled={props.openDisabled || props.formDisabled}
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
            />
        </>
     );
}
 
export default PayPalPayment;
