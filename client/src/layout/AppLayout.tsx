import { ReactNode } from 'react';
import AppBarLayout from './AppBarLayout';
import AppBodyLayout from './AppBodyLayout';

interface AppLayoutProps {
  appBarContent: ReactNode;
  appBodyContent: ReactNode;
}
const AppLayout = (props: AppLayoutProps) => {
  const { appBarContent, appBodyContent } = props;
  return (
    <>
      <AppBarLayout>{appBarContent}</AppBarLayout>
      <AppBodyLayout>{appBodyContent}</AppBodyLayout>
    </>
  );
};

export default AppLayout;
