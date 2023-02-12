import { Layout } from './components/layouts/Layout';
import { ModalsContainer } from './components/dialogs/ModalsContainer';
import { SessionProvider } from './stores/session.provider';

function App(): JSX.Element {
  return (
    <SessionProvider>
      <ModalsContainer />
      <Layout />
    </SessionProvider>
  );
}

export default App;
