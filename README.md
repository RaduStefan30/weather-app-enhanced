
# React Weather Application

This React Weather Application is a feature-rich, responsive web application built using React, TypeScript, and SASS. It aims to provide users with accurate and up-to-date weather forecasts. The application utilizes Jest and the React Testing Library for unit tests, ensuring that each component performs as expected.

## Features

- **Location-Based Weather Search**: Users can search for weather forecasts based on their desired locations, with helpful autocomplete suggestions.
- **Three-Day Forecast**: The application provides a forecast for the next three days, allowing users to plan ahead.
- **Dynamic Backgrounds**: The UI features dynamic backgrounds that change to match the current weather conditions.
- **Measurement Units Toggle**: Users can switch between Celsius and Fahrenheit for temperature readings.
- **Multilingual Support**: Offers multiple language options to cater to a global audience.
- **IP Geolocation**: For new users, the application automatically detects and displays the weather for their current location using IP geolocation.
- **Search History**: User search history is saved in local storage for convenience.

## Technical Structure

- **State Management**: Utilizes the React Context API for global state management.
- **Routing**: Implements React Router for seamless navigation between components.
- **SASS Architecture**: Employs the SASS 7-1 architecture for a modular and maintainable stylesheet structure.
- **Responsive Design**: The application is designed with a mobile-first approach, ensuring it adapts smoothly to various screen sizes.
- **Unit Testing**: Incorporates Jest and React Testing Library to ensure components function correctly.

## Code Quality
 To maintain a high standard of code quality, this project is integrated with SonarCloud. SonarCloud automatically reviews code for bugs, vulnerabilities, and code smells on each push and pull request. It helps ensure that the codebase is clean and maintainable. 
 [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=RaduStefan30_weather-app-enhanced&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=RaduStefan30_weather-app-enhanced) [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=RaduStefan30_weather-app-enhanced&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=RaduStefan30_weather-app-enhanced) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=RaduStefan30_weather-app-enhanced&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=RaduStefan30_weather-app-enhanced) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=RaduStefan30_weather-app-enhanced&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=RaduStefan30_weather-app-enhanced)


## Getting Started

These instructions will get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before running the project, you need to have Node.js and npm installed on your system. You can download and install them from [Node.js official website](https://nodejs.org/).

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/RaduStefan30/weather-app-enhanced.git
```

2. **Navigate to the project directory**

```bash
cd weather-app-enhanced
```

3. **Install dependencies**
```bash
npm install
```

### Running the Application

```bash
npm run dev
```

## Deployment

The application is deployed on Netlify. [https://enhanced-weather-app.netlify.app]
