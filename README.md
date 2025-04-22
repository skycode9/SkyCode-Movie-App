# 🎬 SkyCode Movie App

<div align="center">
  
  [![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![Redux](https://img.shields.io/badge/Redux-4.2.1-764ABC?style=for-the-badge&logo=redux)](https://redux.js.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-4.4.9-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
  [![TMDB API](https://img.shields.io/badge/TMDB_API-v3-01B4E4?style=for-the-badge&logo=themoviedatabase)](https://www.themoviedb.org/documentation/api)
  
  <p>A modern, responsive movie discovery platform built with React, Redux, and Tailwind CSS</p>
  
  [Demo](https://skycode-movie-app.netlify.app) | [Features](#key-features) | [Installation](#installation) | [Technologies](#technologies) | [Screenshots](#screenshots) | [Contact](#contact)
  
</div>

## 🌟 Overview

SkyCode Movie App is a feature-rich movie discovery platform that allows users to explore trending movies, TV shows, and popular celebrities. Built with modern web technologies, this application showcases my frontend development skills, state management expertise, and ability to create responsive, user-friendly interfaces.

The application integrates with The Movie Database (TMDB) API to provide up-to-date information on the latest movies, TV shows, and entertainment personalities.

## 🚀 Key Features

- **Responsive Design**: Fully responsive layout that works seamlessly across desktop, tablet, and mobile devices
- **Dynamic Content**: Real-time data fetching from TMDB API with elegant loading states
- **Infinite Scroll**: Smooth infinite scrolling for browsing large collections of content
- **Advanced Filtering**: Filter content by category, duration, and more
- **Detailed Information**: Comprehensive details for movies, TV shows, and people
- **Video Trailers**: Watch trailers directly within the application
- **Modern UI**: Clean, intuitive interface with smooth animations and transitions
- **State Management**: Centralized state management with Redux for predictable data flow
- **Performance Optimized**: Fast loading times and optimized rendering

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/skycode9/SkyCode-Movie-App.git

# Navigate to the project directory
cd SkyCode-Movie-App

# Install dependencies
npm install

# Create a .env file in the root directory with your TMDB API key
# Example .env file:
# VITE_TMDB_API_KEY=your_api_key_here
# VITE_API_BASE_URL=https://api.themoviedb.org/3

# Start the development server
npm run dev

# Build for production
npm run build
```

## 🔑 Environment Variables

The application requires the following environment variables to be set in a `.env` file in the root directory:

```
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_API_BASE_URL=https://api.themoviedb.org/3
```

To obtain a TMDB API key:

1. Create an account on [The Movie Database](https://www.themoviedb.org/)
2. Go to your account settings
3. Click on the "API" section
4. Follow the instructions to request an API key
5. Once approved, copy your API key to the `.env` file

## 🔧 Technologies

### Frontend

- **React**: Component-based UI library for building the user interface
- **Redux**: State management for handling application data
- **React Router**: Navigation and routing between different views
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Axios**: Promise-based HTTP client for API requests
- **React Infinite Scroll**: Component for implementing infinite scrolling

### Development

- **Vite**: Next-generation frontend tooling for faster development
- **ESLint**: Linting utility for maintaining code quality
- **Prettier**: Code formatter for consistent code style

### APIs

- **TMDB API**: The Movie Database API for fetching movie, TV, and person data

## 🔄 Redux Implementation

The application uses Redux with Redux Toolkit for state management, particularly for handling detailed data for movies, TV shows, and people profiles. The implementation follows a modular approach with separate slices for different entity types.

### Store Structure

```
src/
└── store/
    ├── store.jsx              # Main Redux store configuration
    ├── reducers/              # Redux slices (reducers + actions)
    │   ├── movieSlice.jsx     # Movie state management
    │   ├── tvSlice.jsx        # TV show state management
    │   └── personSlice.jsx    # Person/actor state management
    └── actions/               # Async action creators
        ├── movieActions.jsx   # Movie-related async actions
        ├── tvActions.jsx      # TV-related async actions
        └── personActions.jsx  # Person-related async actions
```

### Redux Slices

Each slice manages a specific domain of the application:

- **Movie Slice**: Handles movie details, recommendations, videos, and watch providers
- **TV Slice**: Manages TV show details, seasons, episodes, and related content
- **Person Slice**: Controls actor/director profiles, filmography, and biographical information

### Async Actions

The application uses thunk middleware to handle asynchronous operations:

```jsx
// Example from movieActions.jsx
export const asyncLoadMovie = (id) => async (dispatch, getState) => {
  try {
    // Multiple API calls to gather comprehensive movie data
    const details = await baseUrl.get(`/movie/${id}`);
    const externalId = await baseUrl.get(`/movie/${id}/external_ids`);
    const recommendations = await baseUrl.get(`/movie/${id}/recommendations`);
    // ...more API calls

    // Combine all data into a single object
    let ultimateDetails = {
      details: details.data,
      externalId: externalId.data,
      recommendations: recommendations.data.results,
      // ...more data
    };

    // Dispatch to Redux store
    dispatch(loadMovie(ultimateDetails));
  } catch (error) {
    console.error(error);
  }
};
```

### Component Integration

Components connect to the Redux store using hooks:

```jsx
// Example from MovieDetails.jsx
const dispatch = useDispatch();
const movieData = useSelector((state) => state.movie.info);

useEffect(() => {
  // Fetch movie data when component mounts
  dispatch(asyncLoadMovie(id));

  // Clean up when component unmounts
  return () => {
    dispatch(removeMovie());
  };
}, [id, dispatch]);
```

### Benefits of the Redux Implementation

1. **Centralized State**: All application data is stored in a single place
2. **Optimized Data Fetching**: Multiple API calls are combined into single actions
3. **Clean Component Logic**: Components focus on rendering, not data fetching
4. **Consistent Data Structure**: Each entity type has a predictable state shape
5. **Efficient Updates**: Only affected components re-render when data changes
6. **Improved Developer Experience**: Redux DevTools integration for debugging

This Redux architecture enables efficient data management across the application, providing a seamless user experience even when dealing with complex nested data from the TMDB API.

<!-- ## 📱 Screenshots -->

<!-- <div align="center">
  <img src="https://i.imgur.com/example1.png" alt="Home Screen" width="45%" />
  <img src="https://i.imgur.com/example2.png" alt="Movie Details" width="45%" />
  <img src="https://i.imgur.com/example3.png" alt="TV Shows" width="45%" />
  <img src="https://i.imgur.com/example4.png" alt="People" width="45%" />
</div> -->

## 🧠 What I Learned

Building this project helped me strengthen my skills in:

- **Component Architecture**: Creating reusable, maintainable React components
- **State Management**: Implementing Redux for complex state management
- **API Integration**: Working with external APIs and handling asynchronous data
- **Responsive Design**: Crafting interfaces that work across all device sizes
- **Performance Optimization**: Implementing techniques like infinite scrolling and lazy loading
- **Modern JavaScript**: Utilizing ES6+ features for cleaner, more efficient code

## 🔮 Future Enhancements

- User authentication system
- Personalized watchlists and favorites
- Advanced search functionality
- Dark/light theme toggle
- Offline support with service workers
- Internationalization support

## 📬 Contact

I'm always open to discussing tech, projects, or opportunities:

<!-- - **Portfolio**: [skycode.dev](https://skycode.dev)
- **GitHub**: [@skycode9](https://github.com/skycode9)
- **LinkedIn**: [Sky Code](https://linkedin.com/in/skycode) -->

- **Email**: akamin5@outlook.com

## 🙏 Acknowledgements

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for their comprehensive API
- [Remix Icon](https://remixicon.com/) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- All the open-source libraries that made this project possible

---

<div align="center">
  <p>Designed & Developed with ❤️ by Sky Code</p>
  <p>© 2025 Sky Code. All Rights Reserved.</p>
</div>
