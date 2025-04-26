import { PayPalButtons , PayPalScriptProvider } from "@paypal/react-paypal-js"

const PayPalButton = ({amount , onSuccess , onError}) => {
   return (
      <PayPalScriptProvider options={{ "client-id": "AWUMX1QVL3G-1L2tMfKu7pu-y3pd-hT-b4E3mdaImdzcWHvBNkuivIAiEeiJX7PE8vOycdDB36zu5iQG" }}>
         <PayPalButtons style={{layout: "vertical"}}
         createOrder={(data, actions) => {
            return actions.order.create({
               purchase_units: [{
                  amount: {
                     value: amount
                  }
               }]
            }) 
         }}

         onApprove={(data,actions) =>{
            return actions.order.capture().then(onSuccess)
         }}

         onError={onError}
         
         />
      </PayPalScriptProvider>
   )
}

export default PayPalButton