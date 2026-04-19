import firebase_admin
from firebase_admin import credentials, auth

# Load service account key
# You need to download this from Firebase Console > Project Settings > Service Accounts
try:
    cred = credentials.Certificate("./serviceAccountKey.json")
    firebase_admin.initialize_app(cred)
except FileNotFoundError:
    print("Warning: serviceAccountKey.json not found. Auth will not work until you add it.")
    print("Download from: Firebase Console > Project Settings > Service Accounts > Generate new private key")

# Export for use in other modules
firebase_auth = auth
