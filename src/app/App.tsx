import "./style/globals.css";
import { Toaster } from '@/shared/ui/base/toaster'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { EmptyLayout } from '@/widgets/layouts/empty-layout'
import { MainLayout } from '@/widgets/layouts/main-layout'
import { useEffect } from 'react'
import { api, useAuthStore } from '@/entities/auth'
import { useQuery } from '@tanstack/react-query'

function App() {
  const {setUser, user} = useAuthStore()
  const navigate = useNavigate();
  const location = useLocation();

  const isEmptyLayout = location.pathname.toLowerCase() === '/auth' || location.pathname.toLowerCase() === '/signup';

  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth"],
    queryFn: api.meQueryFn,
    enabled: !isEmptyLayout,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!isEmptyLayout && !isLoading && data) {
      setUser(data.data)
    }
  }, [data])

  const Layout = location.pathname.toLowerCase() === '/auth' || location.pathname.toLowerCase() === '/signup' ? EmptyLayout : MainLayout;

  if (isLoading)
    return <div>Загрузка...</div>;

  if (isError)
    return <div>Произошла ошибка при загрузке данных.</div>;

  return (
    <Layout>
      <Toaster />
      <Outlet />
    </Layout>
  );
}

export default App
