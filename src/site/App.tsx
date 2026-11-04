import ProjectOverviewPage from '@/site/pages/ProjectOverviewPage';
import TechnicianPortalPage from '@/site/pages/TechnicianPortalPage';
import SiteHeader from '@/site/components/layout/SiteHeader';
import { usePageRoute } from '@/site/hooks/usePageRoute';
import { useTheme } from '@/site/hooks/useTheme';

export default function App() {
  const { page, setPage } = usePageRoute();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader page={page} onNavigate={setPage} theme={theme} onToggleTheme={toggleTheme} />
      <main className="flex-1">
        {page === 'apresentacao' && <ProjectOverviewPage onNavigate={setPage} />}
        {page === 'portal' && <TechnicianPortalPage />}
      </main>
    </div>
  );
}
