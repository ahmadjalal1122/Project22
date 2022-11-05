import requests
import json

# Set your magento installation base url and access token
baseURL = "https://magento.jsmartfix.com/rest/default/V1/"
token = "s8ohb34lwfdv2743tex3kl4ot8wj88x8"

headers = {
   "Accept": "application/json",
   "Content-Type": "application/json",
   "Authorization" : 'Bearer '+ token
}

# Get all Orders
def get_orders():
    url = baseURL + "orders?searchCriteria='&fields=items[entity_id,customer_firstname,customer_lastname]"
    response = requests.request(
    "GET", 
    url,
    headers=headers
    )
    return(json.loads(response.text))  

# Get Order By ID
def get_order_by_id(orderId):
    url = baseURL + "orders/" + str(orderId)
    response = requests.request(
       "GET", 
       url,
       headers=headers
    )
    return(json.loads(response.text))  

# Print order details
def print_order(order):
    #print (order["items"])
    print ("_____________________________________________")
    print ("Order Id:", order["entity_id"])
    print ("Order Date:", order["created_at"])
    print ("Order Status:", order["status"])
    print ("Customer Name:", order["customer_firstname"], order["customer_lastname"])
    print ("Email:", order["customer_email"])
    print ("---------------------------------------------")
    print ("{:<25} {:>5} {:>10}".format("Item","Qty","Price"))
    for item in order["items"]:
        print("{:<25} {:>5} {:>10}".format(item["name"], item["qty_ordered"], item["price"])) 
    print ("---------------------------------------------")
    print ("{:<31} {:>10.2f}".format("Shipping", order["shipping_amount"]))
    print ("{:<31} {:>10.2f}".format("Total", order["total_due"]))
    print ("_____________________________________________")    

def test_getOrderDetails():
    orders = get_orders()
    for order in orders["items"]:
        print(order)
    first_order_id = (orders["items"])[0]["entity_id"]
    order = get_order_by_id(first_order_id)
    print_order(order)

if __name__ == "__main__":
    test_getOrderDetails()
    
    
# run pytest through
# pytest TestCases