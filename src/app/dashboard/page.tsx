import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import React from 'react';
import EmployeesStats from '@/app/dashboard/components/employees/employees-stats';
import TeamsStats from './components/teams/teams-stats';

const DashboardPage = () => {
  return (
    <Tabs defaultValue="employees">
      <TabsList className="mb-4">
        <TabsTrigger value="employees">Employees Stats</TabsTrigger>
        <TabsTrigger value="teams">Teams Stats</TabsTrigger>
      </TabsList>
      <TabsContent value="employees">
        <EmployeesStats />
      </TabsContent>
      <TabsContent value="teams">
        <TeamsStats />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardPage;
