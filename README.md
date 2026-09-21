# CS 465 Full Stack Development Reflection

## Architecture

During this course, I worked with several different types of frontend development. The original customer-facing website used HTML, CSS, JavaScript, Express, and Handlebars templates. Express handled the routes and controllers on the server, while Handlebars allowed the application to dynamically render trip information instead of repeating static HTML. This approach worked well for the public website because the server prepared the data and returned a complete webpage to the browser.

Later in the course, I created an Angular single-page application for the administrative side of Travlr Getaways. The Angular SPA was different because much more of the application logic ran in the browser. Instead of loading a completely new page after every action, Angular used components, services, and routes to update the interface dynamically. The SPA was especially useful for administrative features such as displaying trip cards, adding new trips, editing existing trips, and updating information. I found that Angular required more structure than the original Express website, but that structure also made the application easier to organize as the functionality became more complex.

The backend used MongoDB as the NoSQL database. MongoDB was a good choice because the trip information could be stored as documents that closely matched the JSON objects used throughout the application. It also worked naturally with Node.js and Mongoose. Mongoose provided schemas and models that gave the data more structure and allowed the application to retrieve, create, update, and delete trip records without writing traditional SQL queries.

## Functionality

JSON and JavaScript are closely related, but they are not the same thing. JavaScript is a programming language that can contain functions, variables, logic, and objects. JSON is a text-based data format used to represent and exchange information. JSON does not contain application logic. In this project, JSON became an important connection between the frontend and backend because the REST API returned trip records as JSON.

For example, MongoDB stored trip data, Mongoose retrieved the records, and the Express REST API returned those records as JSON. The Angular application then received the JSON response and converted it into Trip objects that could be displayed through reusable components. This allowed the different parts of the MEAN stack to communicate using a common data format.

Throughout the development process, I refactored the application several times to improve its structure and functionality. One major example was replacing the original static Travel page with Handlebars templates and reusable header and footer partials. I later moved the trip information from hard-coded HTML into JSON and then into MongoDB. The application was refactored again when I created a separate REST API layer and changed the customer-facing Travel controller to request data from the API rather than directly reading a JSON file.

The Angular SPA also demonstrated the value of reusable UI components. The Trip Card component could display different trips using the same HTML and logic. This reduced duplicate code and made it easier to maintain the interface. If the design of a trip card needed to change, the change could be made once instead of being repeated for every trip. Reusable components also made it easier to add functionality such as Edit actions while keeping the application organized.

## Testing

Testing became more important as additional layers were added to the application. I used Postman to manually test REST API endpoints and verify that the correct HTTP methods, status codes, and JSON responses were returned.

GET requests were used to retrieve all trips or one specific trip. POST requests created new trip records. PUT requests updated existing records, and DELETE requests removed records. Testing each endpoint independently helped determine whether a problem was in the backend API or in the Angular frontend.

I also tested error conditions. For example, requesting a trip code that did not exist returned a 404 response instead of crashing the application. Database or server problems needed appropriate error responses as well. This helped me understand why HTTP status codes are important when developing APIs.

Adding authentication made testing more complicated because some requests required a valid JSON Web Token. I tested login requests to confirm that valid credentials returned a JWT. I also tested protected endpoints without a token and confirmed that they returned an unauthorized response. After providing the valid token in the Authorization header, the secured administrative operations could be completed successfully.

This showed me that hiding an Edit or Add button in the frontend is not enough to secure an application. The backend must also verify authorization before allowing protected operations. Testing both authenticated and unauthenticated requests was important for confirming that the security layer actually worked.

## Reflection

This course helped me understand how the different layers of a full stack application work together. Before completing the project, it was easier to think about the frontend, backend, API, and database as separate technologies. Building Travlr Getaways from the beginning made the relationships between these layers much clearer.

I gained more experience with Node.js, Express, Angular, MongoDB, Mongoose, Handlebars, REST APIs, JSON, Bootstrap, TypeScript, Postman, and JWT authentication. I also became more comfortable with MVC architecture, routing, reusable components, CRUD operations, and separating application responsibilities into logical layers.

One of the most valuable parts of the course was seeing the application evolve over several modules. It started as a static HTML website and gradually became a full stack application with dynamic templates, a database, REST API, Angular administrative interface, CRUD functionality, and secure authentication. Working through those stages helped me understand why software architecture matters and why developers often refactor applications as requirements grow.

These skills can help make me more marketable because modern software development often requires understanding more than one part of an application. Even if a developer specializes in frontend or backend development, understanding how APIs, databases, security, and client applications communicate makes it easier to work with a development team and solve problems across the system.

The required reading also describes full stack developers as valuable because they have knowledge across multiple areas of software development. After completing this project, I better understand why that broad knowledge is useful. I still have areas that I want to improve, especially production deployment, application security, scalability, and designing larger applications, but this course gave me a much stronger understanding of the complete development process.
