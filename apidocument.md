// page 1
> List of city
>>(Get) https://restaurantmysite.herokuapp.com/location   (Done)
> List of restaurant
>>(Get) https://restaurantmysite.herokuapp.com/restaurants   (Done)
> Restaurant on the basis of city
>>(Get) https://restaurantmysite.herokuapp.com/restaurants?stateId=3   (Done)
> List of QuickSearch
>>(Get) https://restaurantmysite.herokuapp.com/mealtype   (Done)

//Page2
> List of restaurant on basis of meal
>>(Get) https://restaurantmysite.herokuapp.com/restaurants?mealId=5  (Done)
> https://restaurantmysite.herokuapp.com/restaurants?mealId=5&stateId=2  (Done)
> Filter on basis of cuisine
>>(Get) https://restaurantmysite.herokuapp.com/filter/1?cuisineId=2  (Done)
> Filter on basis of cost
>>(>(Get) https://restaurantmysite.herokuapp.com/filter/1?lcost=700&hcost=1200  (Done)
> Sort on basis of cost
>>(Get) https://restaurantmysite.herokuapp.com/filter/1?lcost=500&hcost=1200&sort=-1   (Done)

//Page3
> Details of the restaurant
>>(Get) https://restaurantmysite.herokuapp.com/details/5   (Done)
> Menu of the restaurant 
>>(Get) https://restaurantmysite.herokuapp.com/menu/7         (Done)

//page4
> Menu details (selected item)
>>(Post) https://restaurantmysite.herokuapp.com/menuItem    (Done)
[1,4,6]
> Place order
>>(Post) https://restaurantmysite.herokuapp.com/placeOrder   (await)
(
    {
        "name":"Nikita",
        "email":"nikita@gmail.com",
        "address":"Hom 39",
        "phone":934645457,
        "cost":845,
        "menuItem":[10,13,17]
    }
)

//page5
> List of order placed 
>>(Get) https://restaurantmysite.herokuapp.com/orders   (Done)
> List of order placed of particular user
>>(Get) https://restaurantmysite.herokuapp.com/orders?email=monu@gmail.com  (Done)
> Update order status
>>(Put) https://restaurantmysite.herokuapp.com/updateOrder/2  (await)
(
    {
        "status":"TAX_FAIL",
        "bank_name":"AXIS",
        "date":"29/05/2023"
    }   
)



////////////////////////////////
> Delete orders
>>(Delete) https://restaurantmysite.herokuapp.com/deleteOrder/628c485d93399d546c136d84  (await)