# Round-Robin Coupon Distribution with Abuse Prevention

This is a live web application that distributes coupons sequentially to users while preventing abuse using IP and cookie tracking.

🔗 **Live Demo:**(https://coupon-app-six.vercel.app)


## Installation & Setup

1. **Clone the repository**  
   ```sh
   git clone https://github.com/Shahbaz079/CouponApp.git
   cd CouponApp

2. **Install Dependencies**  

   npm install

3. **Set Up environmental variables**

   MONGODB_URI=your_mongodb_connection_string

4. **Run the project locally**   


---

#### 📌 **3. Abuse Prevention Mechanisms**  
```md
## Abuse Prevention Strategies

To prevent multiple coupon claims:
- **IP Tracking**: Each claim is linked to the user's IP and stored in the database. If the same IP tries to claim another coupon within an hour, they are blocked.
- **Cookie Tracking**: A cookie is set when a coupon is claimed, preventing users from claiming again even if they switch networks or refresh the page.



## How to Claim a Coupon?
1. Visit the website.
2. Click the "Claim Coupon" button.
3. If successful, you'll receive a coupon code.
4. If you've already claimed one, you'll see a message telling you when you can try again.


## Deployment

This application is deployed using **Vercel**.

To deploy your own version:
1. Push the code to GitHub.
2. Connect the repository to **Vercel**.
3. Configure **environment variables**.
4. Deploy!

🔗 **Live Demo:**(https://coupon-app-six.vercel.app)
