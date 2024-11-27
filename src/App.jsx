// src/App.jsx

import React, { useRef, useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NotFound from "./components/NotFound";
import MapContainer from "./components/Map/MapContainer";
import SceneContainer from "./components/Scene/SceneContainer";
import Footer from "./components/Footer/Footer"; // Import Footer component
import Header from "./components/Header/Header"; // Import Header component if available
import "./app.css";
import debounce from "lodash.debounce"; // Ensure lodash.debounce is installed

function App() {
  const mapViewRef = useRef(null);
  const sceneViewRef = useRef(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Debounced camera change handlers to prevent rapid state updates
  const handleMapCameraChange = useCallback(
    debounce((newCamera) => {
      if (sceneViewRef.current) {
        sceneViewRef.current.goTo(newCamera).then(() => {
          setIsSyncing(false);
        });
      } else {
        setIsSyncing(false);
      }
    }, 300),
    [sceneViewRef]
  );

  const handleSceneCameraChange = useCallback(
    debounce((newCamera) => {
      if (mapViewRef.current) {
        mapViewRef.current.goTo(newCamera).then(() => {
          setIsSyncing(false);
        });
      } else {
        setIsSyncing(false);
      }
    }, 300),
    [mapViewRef]
  );

  // Cleanup debounced functions on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      handleMapCameraChange.cancel();
      handleSceneCameraChange.cancel();
    };
  }, [handleMapCameraChange, handleSceneCameraChange]);

  // Function to handle camera changes from the Map
  const onMapCameraChange = (newCamera) => {
    if (isSyncing) return;
    setIsSyncing(true);
    handleMapCameraChange(newCamera);
  };

  // Function to handle camera changes from the Scene
  const onSceneCameraChange = (newCamera) => {
    if (isSyncing) return;
    setIsSyncing(true);
    handleSceneCameraChange(newCamera);
  };

  return (
    <Router>
      <Header /> {/* Include Header component if available */}
      <Routes>
        <Route
          path="/"
          element={
            <Home>
              <MapContainer
                onMapViewLoad={(mapView) => {
                  mapViewRef.current = mapView;
                  // Listen for camera changes
                  mapView.watch("camera", onMapCameraChange);
                }}
              />
              <SceneContainer
                onSceneViewLoad={(sceneView) => {
                  sceneViewRef.current = sceneView;
                  // Listen for camera changes
                  sceneView.watch("camera", onSceneCameraChange);
                }}
                onCameraChange={onSceneCameraChange}
              />
            </Home>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer /> {/* Include Footer component */}
    </Router>
  );
}

export default App;
