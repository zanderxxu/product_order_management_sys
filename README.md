# product_order_management_sys
A Full stack project for Product and order management system. 

The project uses the front-end and back-end separation mode, and the front-end is developed using the React framework and deployed to Netlify. The backend is developed using Node.js and MongoDB Atlas database. and deploy to Heroku. The link to access the app website is: https://main--dazzling-beignet-fe6b9c.netlify.app/

## Functions
### Products Management:
1. create product:  
User can create a new product just fill in the product name, price and stock quantity. Then click on the create product button. The success information will show in the bottom. If you did not add any information to the input text box, the create product button will be locked temporary. When you put the information, the button will work. If you create a product successfully, check the drop-down menu of the products list and you will find that the newly created product is in it.
2. update product:  
In order to update product, first select the product you want to update information in the products list. Then it's specific information will be displayed in the text input box including name price and stock quantity. Then after making changes, click the update product button. The success message will appear. In this way, the update is successful.
3. reset:    
Both of the above functions can use reset to delete the content in the text input box.
4. back home:  
Using back home button can return back to the main page.

** There will be a limitation in products list. Now it has been set to 10. If you want to see more products, please click show more button.


### Orders Management:
1. create Order:  
Fill in the product name in the input text box and select quantity. Then click the create order button. The create successful message will appear below. If no information is added to the input text box, the create order button will be temporarily disabled.
2. Update Shipping Info:  
Select the order you want to modify in the orders list. The tracking company and tracking number will be displayed in the input text box. Modify the content you want to modify and click the update shipping info button. The modification success message will be displayed below. If there is no information in the input text box, the button will be temporarily locked.
3. Update Order Status:  
Select the order you want to modify in the orders list. The status will be displayed in the input text box. Select the status you want in the drop-down menu. Click the update status button. The modification success message will be displayed below. If there is no information in the input text box, the button will be temporarily locked.
5. reset:      
Both of the above functions can use reset to delete the content in the text input box.
6. back home:  
Using back home button can return back to the main page.

** There will be a limitation in products list. Now it has been set to 10. If you want to see more products, please click show more button.

### Analysis of Frontend and Backend Development for the Project:

For the frontend, I chose to use React due to its strong scalability. In the frontend, I implemented a limit on the display number for dropdown menus to reduce latency. I believe that in the future, I will continue to develop this part and improve it into a loading mode for a more intuitive display.

Regarding the backend, I opted for MongoDB Atlas for data storage because its cloud-based service greatly enhances scalability. Additionally, Atlas supports read/write splitting, which can improve performance, especially with high data volumes. However, the downside is the high cost. I also think there are certain issues with deploying the backend on Heroku. Currently, I have opened the database to all IPs, but I believe this poses some data exposure risks. In the future, I plan to establish a private database on Heroku and control a single IP to address this issue.

Moreover, I think the project overall lacks security-related features. In the future, I will add user information checks and token verification for project security measures. I also plan to redesign the UI to make the frontend more aesthetically pleasing.

