import { createRoot } from 'react-dom/client';
import App from './App'; // Assuming App is your main component
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Путь к файлу serviceWorkerRegistration

// Use createRoot to render your app
const root = createRoot(document.getElementById('root'));
root.render(<App />);

// Регистрация сервисного работника вместо отмены регистрации
serviceWorkerRegistration.register();
