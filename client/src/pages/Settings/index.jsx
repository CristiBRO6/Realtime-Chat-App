import PageMeta from '@/layouts/PageMeta';

import ChangePasswordForm from '@/pages/Settings/ChangePasswordForm';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import GoBack from '@/components/GoBack';

const Settings = () => {
  return (
    <>
      <PageMeta title={"Settings"} description={"Settings"} />
      
      <div className="grid place-items-center w-full h-full">
        <Card className="max-w-2xl w-full">
          <CardHeader className="flex flex-row items-center gap-2">
            <GoBack href="/chat" />
            <CardTitle className="">Settings</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <span className="text-lg font-medium">Change Password</span>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
  
export default Settings;