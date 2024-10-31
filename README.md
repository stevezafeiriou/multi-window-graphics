# Multiple Window 3D Scene using Three.js and React

This is a template React-based app - adaptation of the [original multipleWindow3dScene](https://github.com/bgstaal/multipleWindow3dScene), designed for creating a synchronized 3D scene across multiple browser windows using Three.js and `localStorage`. This setup leverages React components, hooks, and class-based modules to manage window states and updates efficiently, while maintaining the synchronized 3D view across all windows.

## Features

- **3D Scene Rendering with Three.js**: Render and manage interactive 3D cubes in each window.
- **Multiple Window Synchronization**: Utilize `localStorage` to synchronize the scene across multiple browser windows.
- **Dynamic Window Management**: Automatically add, update, and remove windows from the scene.
- **Window Offset for Continuous Display**: Display a single, continuous 3D scene across multiple screens with offset adjustments.
- **React Component Architecture**: A modular React structure that enhances readability and maintainability.

## Getting Started

### Prerequisites

- **Node.js** and **npm**: Ensure you have Node.js and npm installed. You can download them from [nodejs.org](https://nodejs.org/).

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/stevezafeiriou/multi-window-graphics
cd multi-window-graphics
```

Install the required dependencies:

```bash
npm install
```

### Running the Application

To start the development server:

```bash
npm start
```

This command will open the application on `http://localhost:3000`. You can open multiple tabs or browser windows with the same URL to view the synchronized 3D scene.

### Using the Application

Each open browser window will automatically connect to the synchronized 3D scene and display a part of it based on the `WindowManager` configuration. To see the full effect:

1. **Open Multiple Windows**: Open the same URL (`http://localhost:3000`) in multiple tabs or separate browser windows.
2. **Arrange Windows on Screen**: Arrange these windows side by side to visualize the continuous 3D scene.
3. **Clear Local Storage**: If needed, add `?clear=true` to the URL to clear the `localStorage` cache and reset window data.

### Clearing Local Storage

To reset the windows and remove all existing window data from `localStorage`, open `http://localhost:3000?clear=true`. This will remove stored window data and start fresh.

## Project Structure

The project is organized as follows:

```
.
├── public/
│   ├── index.html         # Main HTML file
├── src/
│   ├── App.js             # Main React component with Three.js scene setup
│   ├── WindowManager.js   # Class to manage window state and synchronization
│   ├── index.js           # Entry point for React
├── package.json           # Dependencies and project configuration
└── README.md              # Project documentation
```

### Key Components

- **App.js**: Contains the main logic for initializing and managing the Three.js scene, rendering the cubes, and handling window resize events. It also integrates `WindowManager` and manages cube synchronization.
- **WindowManager.js**: This class manages the windows, keeping track of each window's position, dimensions, and updates using `localStorage`. It handles adding, updating, and removing windows in the scene pool.

## Detailed Functionality

### App.js

The main `App.js` component uses React's `useEffect` and `useRef` hooks to manage the Three.js rendering lifecycle and synchronize the scene across multiple windows.

- **Scene Initialization**: Initializes the Three.js scene, camera, renderer, and creates a world object to hold all 3D cubes.
- **Window Management**: Uses `WindowManager` to track each window's position and adjust cube positions based on window arrangement.
- **Rendering and Synchronization**: Runs a continuous `renderScene` loop, updating cube positions, orientations, and applying a smooth transition effect.
- **Responsive Resizing**: Listens for window resize events to adjust the camera projection and renderer dimensions accordingly.

### WindowManager.js

The `WindowManager` class manages window data across multiple instances by storing metadata in `localStorage`. Key functions include:

- **init**: Adds the current window to the list of synchronized windows.
- **getWinShape**: Retrieves the current window’s position and size.
- **update**: Checks for changes in window dimensions or position and updates the window’s data.
- **setWinShapeChangeCallback**: Sets a callback function to trigger whenever a window’s shape changes.
- **setWinChangeCallback**: Sets a callback function to trigger when a new window is added to the scene.

## Usage Tips

- **Open Multiple Windows for Full Effect**: The 3D scene is designed to span multiple windows. Arrange them horizontally or vertically to view the complete, continuous 3D scene.
- **Debugging Positions**: Use browser developer tools to inspect the `localStorage` data to see each window’s position and shape in real-time.
- **Clear Local Storage**: Reset window data with the `?clear=true` URL parameter if windows do not align as expected.

## Contributing

Contributions are welcome! Feel free to submit a pull request to enhance the project or report any issues you encounter.

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

## License

This project is open-sourced under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to [bgstaal](https://github.com/bgstaal) for the original project and concept.
- [Three.js](https://threejs.org/) for the 3D graphics library.
- The React community for supporting modern JavaScript development.

For additional information, check the original repository at [bgstaal/multipleWindow3dScene](https://github.com/bgstaal/multipleWindow3dScene).

### Contact

For any inquiries or feedback, please reach out to [Steve Zafeiriou](mailto:steve@saphirelabs.com).
