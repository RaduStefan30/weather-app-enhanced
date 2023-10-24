import './styles/main.scss';
import ReactDOM from 'react-dom/client';
import App from './App';

import { register } from 'swiper/element/bundle';
register();

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
