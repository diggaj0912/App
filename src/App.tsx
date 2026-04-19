/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Event from "./pages/Event";
import Community from "./pages/Community";
import CreateEvent from "./pages/CreateEvent";
import Certificates from "./pages/Certificates";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";
import GenericPage from "./pages/GenericPage";

export const socket = io();

function App() {
  useEffect(() => {
    socket.on("receive-notification", (data: any) => {
      alert(data.message);
    });

    return () => {
      socket.off("receive-notification");
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/event" element={<Event />} />
      <Route path="/community" element={<Community />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/certificates" element={<Certificates />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/profile" element={<Profile />} />
      
      {/* Footer / Extra Pages */}
      <Route path="/network" element={<GenericPage />} />
      <Route path="/resources" element={<GenericPage />} />
      <Route path="/create-post" element={<GenericPage />} />
      <Route path="/features" element={<GenericPage />} />
      <Route path="/pricing" element={<GenericPage />} />
      <Route path="/integrations" element={<GenericPage />} />
      <Route path="/documentation" element={<GenericPage />} />
      <Route path="/api-reference" element={<GenericPage />} />
      <Route path="/help-center" element={<GenericPage />} />
      <Route path="/about" element={<GenericPage />} />
      <Route path="/careers" element={<GenericPage />} />
      <Route path="/blog" element={<GenericPage />} />
      <Route path="/privacy-policy" element={<GenericPage />} />
    </Routes>
  );
}

export default App;
