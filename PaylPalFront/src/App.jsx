import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import InputMask from 'react-input-mask';

import PayPalPayment from './components/PayPalPayment';
import DialogInformation from './components/Dialog';

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Sienna',
    inStock: true,
    size: 'Large',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
]

export default function App() {

    // Variable to control the open state of the dialog modal
    const [open, setOpen] = useState(false);

    // The transaction ID returned from the server, to be shown at the modal
    const [idTransaction, setIdTransaction] = useState(null);

    // Initial options config for the PayPal jdk button
    const initialOptions = {
      "client-id" : "AfkdSYPl3ZVmGBz1i87pyrUljDIa4nY-wPXIxGV8xq2YetRhwWvDYwbIzkICcsVb6VHaI9crRW3OT0H4",
      currency: "BRL",
      intent: "capture",
    };
  
    // OnSuccess event for the order creation at the backEnd
    const onSuccess = (order) => {
      // Open the modal
      setOpen(true);
      // Set the id transaction to be shown
      setIdTransaction(order.id);
    };
  
    // OnFailed event for the order creation at the backEnd
    const onFailed = (order) => {
      // Clear the idTransaction
      setIdTransaction(null);
      // Show an error message returned from the server
      toast.error(order.message);
    };

    // The states to the form
    // The states are already filled according to the assignment
    // #region Form States
    
    const [email, setEmail] = useState('sb-cdrrb29104813@personal.example.com');
    const [errorEmail, setErrorEmail] = useState(false);

    const [firstName, setFirstName] = useState('John');
    const [errorFirstName, setErrorFirstName] = useState(false);

    const [lastName, setLastName] = useState('Doe');
    const [errorLastName, setErrorLastName] = useState(false);

    const [phone, setPhone] = useState('+1-734-212-4031');
    const [errorPhone, setErrorPhone] = useState(false);

    const [addressLine1, setAddressLine1] = useState('3137 Mahlon Street');
    const [errorAddressLine1, setErrorAddressLine1] = useState(false);

    const [addressLine2, setAddressLine2] = useState('');
    // Does not have errorState because it's not mandatory

    const [stateProvince, setStateProvince] = useState('Michigan');
    const [errorStateProvince, setErrorStateProvince] = useState(false);

    const [zipPostalCode, setZipPostalCode] = useState('48335');
    const [errorZipPostalCode, setErrorZipPostalCode] = useState(false);

    const [country, setCountry] = useState('United States');

    // Put the form states together in a variable to be sent to the backEnd
    const pageData = {
      product:{
        description: "Basic Tee",
        cost: "45.31"
      },
      buyer:{
        email,
        firstName,
        lastName,
        phone,
        address:{
          addressLine1,
          addressLine2,
          stateProvince,
          zipPostalCode,
          country
        }
      }
    };

    // Here, the form validates the filling of all the form fields
    const validateValues = (value, setError) => {
        if (setError === undefined) return;

        if (value === undefined || value === null || value === '') {
            setError(true);
        } else {
            setError(false);
        }
    };

    // The error message shown below the field that has been filled empty
    const returnErrorMessage = () =>
    {
      return (
        <p className='mt-1 ml-1 font-alata text-sm text-red-500'>Required field</p>
      )
    }

    //#endregion


    // Function that returns the form disabeld state, that is all error states of the form
    const formDisabledFunction = () => (
      errorEmail ||
      errorFirstName ||
      errorLastName ||
      errorPhone ||
      errorAddressLine1 ||
      errorStateProvince ||
      errorZipPostalCode
    );
    
    // State that control the disabled situation of the form
    const [formDisabled, setFormDisabled] = useState(formDisabledFunction());
    
    // UseEffect function, that calls the formDisabledFunction() everytime  a error state is changed
    useEffect(() => {
      setFormDisabled(formDisabledFunction());
    }, [errorEmail, errorFirstName, errorLastName, errorPhone, errorAddressLine1, errorStateProvince, errorZipPostalCode]);
    
    
    

    return (
      <>
        <PayPalScriptProvider options={initialOptions}>

          <div className="bg-gray-50 px-8">
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">Checkout</h2>

              <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                <div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Personal information</h2>

                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      <div className="sm:col-span-2">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email-address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => validateValues(email, setErrorEmail)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        {errorEmail && returnErrorMessage()}
                      </div>

                      <div>
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="first-name"
                            name="first-name"
                            autoComplete="first-name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            onBlur={() => validateValues(firstName, setErrorFirstName)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        {errorFirstName && returnErrorMessage()}
                      </div>

                      <div>
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            id="last-name"
                            name="last-name"
                            autoComplete="last-name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            onBlur={() => validateValues(lastName, setErrorLastName)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        {errorLastName && returnErrorMessage()}
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <div className="mt-1">
                          <InputMask  
                            type="text"
                            name="phone"
                            id="phone"
                            autoComplete="phone"
                            mask={"+1-999-999-9999"}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onBlur={() => validateValues(phone.replaceAll(/\+1|-|_/g, ''), setErrorPhone)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        {errorPhone && returnErrorMessage()}
                      </div>
                    </div>

                  </div>

                  <div className="mt-10 border-t border-gray-200 pt-10">
                    <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>

                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      
                      <div className="sm:col-span-2">
                        <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
                          Address Line 1
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="addressLine1"
                            id="addressLine1"
                            autoComplete="addressLine1"
                            value={addressLine1}
                            onChange={(e) => setAddressLine1(e.target.value)}
                            onBlur={() => validateValues(addressLine1, setErrorAddressLine1)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        {errorAddressLine1 && returnErrorMessage()}
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">
                          Address Line 2
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="addressLine2"
                            id="addressLine2"
                            value={addressLine2}
                            onChange={(e) => setAddressLine2(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                          State / Province
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="region"
                            id="region"
                            autoComplete="state"
                            value={stateProvince}
                            onChange={(e) => setStateProvince(e.target.value)}
                            onBlur={() => validateValues(stateProvince, setErrorStateProvince)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        {errorStateProvince && returnErrorMessage()}
                      </div>

                      <div>
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                          Zip / Postal code
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="postal-code"
                            id="postal-code"
                            autoComplete="postal-code"
                            value={zipPostalCode}
                            onChange={(e) => setZipPostalCode(e.target.value)}
                            onBlur={() => validateValues(zipPostalCode, setErrorZipPostalCode)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        {errorZipPostalCode && returnErrorMessage()}
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <div className="mt-1">
                          <select
                            id="country"
                            name="country"
                            autoComplete="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Order summary */}
                <div className="mt-10 lg:mt-0">
                  <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

                  <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                    <h3 className="sr-only">Items in your cart</h3>
                    <ul role="list" className="divide-y divide-gray-200">
                      {products.map((product) => (
                        <li key={product.id} className="flex px-4 py-6 sm:px-6">
                          <div className="flex-shrink-0">
                            <img src={product.imageSrc} alt={product.imageAlt} className="w-20 rounded-md" />
                          </div>

                          <div className="ml-6 flex flex-1 flex-col">
                            <div className="flex">
                              <div className="min-w-0 flex-1">
                                <h4 className="text-sm">
                                  <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                                    {product.name}
                                  </a>
                                </h4>
                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                              </div>

                            </div>

                          </div>
                        </li>
                      ))}
                    </ul>
                    <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex items-center justify-between">
                        <dt className="text-sm">Subtotal</dt>
                        <dd className="text-sm font-medium text-gray-900">R$ 32.00 BRL</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-sm">Shipping</dt>
                        <dd className="text-sm font-medium text-gray-900">R$ 4.99 BRL</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-sm">Taxes</dt>
                        <dd className="text-sm font-medium text-gray-900">R$ 8.32 BRL</dd>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                        <dt className="text-base font-medium">Total</dt>
                        <dd className="text-base font-medium text-gray-900">R$ 45.31 BRL</dd>
                      </div>
                    </dl>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <PayPalPayment data={pageData} formDisabled={formDisabled} openDisabled={open} onSuccess={onSuccess} onFailed={onFailed}/>
                    </div>
                    
                  </div>
                </div>
              </form>
            </div>
          </div>

        </PayPalScriptProvider>

        {/* Toast component to show the messages in the page */}
        <Toaster/>
        {/* Modal that is used to show the success in the operation. The modal shows a message and the transaction ID */}
        <DialogInformation open={open} setOpen={setOpen} idTransaction={idTransaction}/>
      </>
    )
}


