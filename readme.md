## Features

- User registration and login
- Social media authentication (Google, Facebook)
- Responsive web interface
- Native mobile app
- Consistent design across platforms

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (for testing)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/registration-system.git
cd registration-system
```
2. Install dependencies for web:
bash
cd web
npm install
```
3. Install dependencies for mobile:
```bash
cd mobile_screen/LoginApp
npm install
```
    
### Running the Applications

#### Web Application

```bash
cd web
npm start
```
The web app will be available at `http://localhost:3000`

#### Mobile Application
```bash
cd mobile_screen/LoginApp
npx expo start
```
Scan the QR code with Expo Go app on your device

## Test Credentials

Use these credentials to test the application:

```
Email: test2@example.com
Password: Test123!
```

## Mobile App Development

To run the mobile app in development:

1. Install Expo Go on your mobile device
2. Start the Expo development server:
```bash
cd mobile_screen/LoginApp
npx expo start
```
3. Scan the QR code with:
   - iOS: Camera app
   - Android: Expo Go app

## Troubleshooting

If you encounter any issues:

1. Clear npm cache:
```bash
npm cache clean --force
```

2. Clear Expo cache:
```bash
npx expo start -c
```

3. For watchman issues on macOS:
```bash
watchman watch-del-all
```


Scan the QR code with Expo Go app on your device

## Test Credentials

Use these credentials to test the application:

```
Email: test2@example.com
Password: Test123!
```

## Tech Stack

- Frontend Web: React, Material-UI
- Mobile: React Native, Expo
- Navigation: React Router (web), React Navigation (mobile)
- Styling: Material-UI (web), StyleSheet (mobile)
- Icons: Material Icons, Custom SVG

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
    