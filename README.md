# Platform of Hotel: The Wild Oasis

> [!IMPORTANT] 
> **The Website is Deployed on Vercel https://wild-oasis-cabins-gold.vercel.app**

> [!NOTE]
> Pages to Visit: 
>* [Home](https://wild-oasis-cabins-gold.vercel.app) 
>* [About](https://wild-oasis-cabins-gold.vercel.app/about) 
>* [Cabins](https://wild-oasis-cabins-gold.vercel.app/cabins)
>* [Cabin 001](https://wild-oasis-cabins-gold.vercel.app/cabins/92) (e.g)
>* [Sign in](https://wild-oasis-cabins-gold.vercel.app/login) 
>* [account main info](https://wild-oasis-cabins-gold.vercel.app/account) (protected route, log in to access)
>* [your reservations](https://wild-oasis-cabins-gold.vercel.app/account/reservations) (protected route, log in to access)
>* [edit profile](https://wild-oasis-cabins-gold.vercel.app/account/profile) (protected route, log in to access)
>* [Does not exist](https://wild-oasis-cabins-gold.vercel.app/jahsfkw) 

_The project was created for personal portfolio of Giorgi Gogsadze in Summer 2024. The information contained in it is completely fictitious._

## Technical Side
The website harnesses the power of **Next.js 15** app router and **React 19** with **tailwind CSS** for styling, leveraging the latest features to create a seamless user experience. The code is written in Typescript to ensure type safety and code quality throughout the project. 

The project utilizes the latest and traditional features for the best user experience, including:
>* **Partial Prerendering**: Optimize load times by prerendering essential pages.
>* **Optimistic UI**: Enhance responsiveness by updating the UI optimistically.
>* **Server Actions**: Seamlessly interact with the database using server actions.
>* **Middlewares**: Safeguard routes from unauthorized access with middleware functions.

Our commitment to visibility extends beyond aesthetics. We’ve meticulously implemented **SEO** best practices and included Open Graph images for social sharing.

The backbone of our data lies in Supabase, powered by **PostgreSQL**. The database contains complex connections between tables and implements functions and triggers to maintain constancy and for example, check whether the time range of reservation is valid and available.

## Description

The website is specially designed forthe  hotel company _The Wild Oasis_ and provides a platform where users can browse, get information and book cabins. 

At the beginning of the website, there is a **welcome** text from which we go directly to the list of cabins.

On the **cabins page** users can browse all the cabins or filter by capacity, Look through the interiors of the cabins, and find out prices. they can see detailed information including description and location on each cabin page. However, only registered users can reserve a cabin, so the website makes it easy to _sign in with a Google account_.

On the **cabin page** a form for cabin reservation is given. Registered guests mark the desired time range on the calendar, select the number of guests, and write additional information, which is enough to reserve a cabin.

To learn more about the company, they can visit the **About Us page**, where a small photo gallery and information about Wild Oasis can be found.

On the **Guest area**, Users see on which dates they have reservations. Here they can manage, edit or delete reservations and update their profile.

In summary, the website fulfills its main purpose with a simple and user-friendly interface.
