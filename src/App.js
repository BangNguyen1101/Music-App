import { AudioProvider } from './context/AudioContext';
import MiniPlayerBar from './components/MiniPlayerBar';

export default function App() {
  return (
    <AudioProvider>
      {/* ... phần NavigationContainer hoặc Stack ... */}
      {/* ... existing code ... */}
      <MiniPlayerBar />
    </AudioProvider>
  );
} 