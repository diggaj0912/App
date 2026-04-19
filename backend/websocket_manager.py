"""
WebSocket connection manager for real-time notifications
"""
from fastapi import WebSocket
from typing import List, Dict
import json

class ConnectionManager:
    """Manager for WebSocket connections for real-time notifications"""
    
    def __init__(self):
        # Store active connections: {user_email: [websocket, ...]}
        self.active_connections: Dict[str, List[WebSocket]] = {}
    
    async def connect(self, websocket: WebSocket, user_email: str):
        """Accept and register a new WebSocket connection"""
        await websocket.accept()
        
        if user_email not in self.active_connections:
            self.active_connections[user_email] = []
        
        self.active_connections[user_email].append(websocket)
        print(f"User {user_email} connected. Total: {len(self.active_connections[user_email])}")
    
    def disconnect(self, user_email: str, websocket: WebSocket):
        """Unregister and close a WebSocket connection"""
        if user_email in self.active_connections:
            self.active_connections[user_email].remove(websocket)
            
            if len(self.active_connections[user_email]) == 0:
                del self.active_connections[user_email]
            
            print(f"User {user_email} disconnected")
    
    async def send_personal(self, message: dict, user_email: str):
        """Send message to a specific user"""
        if user_email in self.active_connections:
            # Create message as JSON string
            message_json = json.dumps(message)
            
            # Send to all connections of this user
            disconnected = []
            for connection in self.active_connections[user_email]:
                try:
                    await connection.send_text(message_json)
                except:
                    disconnected.append(connection)
            
            # Remove disconnected connections
            for conn in disconnected:
                self.active_connections[user_email].remove(conn)
    
    async def broadcast(self, message: dict):
        """Send message to all connected users"""
        message_json = json.dumps(message)
        
        for user_email, connections in self.active_connections.items():
            disconnected = []
            for connection in connections:
                try:
                    await connection.send_text(message_json)
                except:
                    disconnected.append(connection)
            
            # Remove disconnected connections
            for conn in disconnected:
                connections.remove(conn)

# Global connection manager instance
manager = ConnectionManager()
