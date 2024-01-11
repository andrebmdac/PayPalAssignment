import fetch from "node-fetch";
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

// PayPal sandbox environment URL
const base = "https://api-m.sandbox.paypal.com";

// Function to create a PayPal order; The function is called in the button click
export async function createOrder(data)
{   
    // Access token generated each time the function is called
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;

    // The PayLoad is filled with the information that came from the form
    const payload = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "BRL",
                    value: data.product.cost,
                },
            },
        ],
        shipping: {
            name: {
                full_name: data.buyer.firstName + ' '+  data.buyer.lastName
            },
            address: {
                address_line_1: data.buyer.address.addressLine1,
                address_line_2: data.buyer.address.addressLine2,
                admin_area_2: data.buyer.address.stateProvince,
                postal_code: data.buyer.address.zipPostalCode,
                country: data.buyer.address.country,
            },
            phone: {
                phone_type: 'MOBILE',
                phone_number: {
                    national_number:  data.buyer.phone
                }
            }
          },
          payer: {
            email_address:  data.buyer.email
          }
    };
        
    // Calls the route
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        method: "post",
        body: JSON.stringify(payload),
    });

    // DB access to create order;

    // Handle the response from the call
    return handleResponse(response);
}

// Function to capture the payment of a PayPal order; The function is called in the button "Complete purchase" inside the PayPal page;
export async function capturePayment(data)
{
    // Access token generated each time the function is called
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${data.orderID}/capture`;

    // The headers for the api call
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
    };

    // Uncomment one these to force an error for negative testing (in sandbox mode only). 
    // headers["PayPal-Mock-Response"] = '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}';

    // Calls the route
    const response = await fetch(url, {
        method: "POST",
        headers: headers
    });
        
    // Handle the response from the call
    return handleResponse(response);
}

// Function to generate an access token for PayPal API using client credentials
export async function generateAccessToken() {
    try {
        // Combine client ID and client secret and encode in base64 for authentication
        const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET).toString("base64");

        // Make a POST request to the PayPal OAuth2 token endpoint
        const response = await fetch(`${base}/v1/oauth2/token`, {
            method: "post",
            body: "grant_type=client_credentials",  // Specify the grant type for client credentials
            headers: {
                Authorization: `Basic ${auth}`,  // Include the base64-encoded client credentials in the Authorization header
            },
        });

        // Handle the response and extract the access token
        const jsonData = await handleResponse(response);
        
        // Return the access token for further use
        return jsonData.access_token;

    } catch (error) {
        // Log an error message if there is a failure in generating the access token
        console.error("Failed to generate Access Token:", error);
    }
}

// Function to handle the response from a fetch request
async function handleResponse(response) {
    // Check if the response status is a successful HTTP status code (200 or 201)
    if (response.status === 200 || response.status === 201) {
        // If successful, parse the response body as JSON and return the result
        return response.json();
    }

    // If the response status is not successful, extract the error message from the response body
    const errorMessage = await response.text();

    // Throw an error with the extracted error message
    throw new Error(errorMessage);
}
  
