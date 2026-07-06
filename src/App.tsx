import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@/i18n';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import ResumeBookingPrompt from '@/components/wizard/ResumeBookingPrompt';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ResumeBookingPrompt />
      <Layout>
        <HomePage />
      </Layout>
    </QueryClientProvider>
  );
}
