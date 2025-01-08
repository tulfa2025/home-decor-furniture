# **Tool Report and Justifications**

This report aims to explain the reasons behind the choice of certain tools in the development of the project, providing technical details and the purpose of each one. The goal is to make it clear for the next person who works on the project, ensuring that the decisions made are understood.

## **Next.js**
Next.js was chosen primarily for its route optimization capabilities, especially through the **App Router**, which helps organize and control the application's routes. Additionally, it takes advantage of hydration to optimize processing between the client and server sides. This results in a smoother user experience by reducing loading times and improving overall performance.

> **Important:**
> - Inside the **`src`** directory:
>   - The **main page layout and components** are directly placed in their respective folders.
>   - For other routes, specific folders inside `router` contain the respective components and layouts.
> - The **`public`** directory is organized as follows:
>   - Assets for the **main page** are directly inside the `images` and `videos` folders.
>   - A **pages** folder inside `images` and `videos` contains assets specific to routes.
> - **Images:** Initially, images were extracted from **Figma** to help structure the project with visual resources. These should be replaced by the final versions available on the **OneDrive** associated with the project.

## **TypeScript**
The use of **TypeScript** is essential for integrating certain component libraries, such as **ShadcnUI**, which provides pre-built components like carousels and dialog boxes. TypeScript is also crucial for ensuring better structure of **props** in components, providing clearer, autocomplete code, and helping to avoid common errors during development. It creates a safer and more scalable development environment with type-checking.

## **TailwindCSS**
**TailwindCSS** was chosen for its efficiency in styling the project, especially when combined with component libraries. It accelerates development with its **utility-first classes**, allowing quick and practical styling of elements while keeping the code clean and organized. Using TailwindCSS makes it easier to integrate pre-existing components, such as those from **ShadcnUI**, without the need for excessive overriding or creating custom CSS from scratch.

## **SCSS**
The choice of **SCSS** was made for the need for **advanced style organization** and **variable control**. It allows for a cleaner and more indented CSS structure, making maintenance easier in the long run. **SCSS** enables the creation of centralized variables for colors, fonts, and sizes, improving style reuse and consistency across the project.

> **Important:** Remember to check the `shared` folder inside the `styles` directory for global variables that will be used throughout the project. These variables ensure consistency and simplify future adjustments to the design system.

## **React Icons**
The **React Icons** library was included to provide customizable icons, which are easily scalable and adaptable to different parts of the project. This library allows for consistent styling and improves the user interface by integrating lightweight, responsive, and customizable icons that match the design requirements.

## **@Alias**
To improve project structure and simplify imports, we are using **@alias** for directory management. The **@/*** alias is configured in the `src` directory, allowing for easier and cleaner import paths. This eliminates the need for relative path navigation and improves code readability, making the development process smoother.

---

### **Latest Updates**
Recent updates to the project include:
- **Navigation for routes**: Implemented to improve the user flow across the application.
- **Creation of the Product Videos page**: A new page was designed and partially implemented. A reusable component has been developed to handle its repetitive structures. For the layout, the only feature pending is the **carousel**.
