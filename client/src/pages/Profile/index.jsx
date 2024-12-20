import PageMeta from '@/layouts/PageMeta';

import useUser from '@/hooks/useUser';

import ChangeAvatarForm from '@/pages/Profile/ChangeAvatarForm';
import UpdateProfileForm from '@/pages/Profile/UpdateProfileForm';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import GoBack from '@/components/GoBack';

const Profile = () => {
  const { user } = useUser();

  return (
    <>
      <PageMeta title={"Profile"} description={"Profile"} />
      
      <div className="grid place-items-center w-full h-full">
        <Card className="max-w-2xl w-full">
          <CardHeader className="flex flex-row items-center gap-2">
            <GoBack href="/chat" />
            <CardTitle className="">Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="w-full flex items-center gap-2 pb-4 border-b">
              <ChangeAvatarForm />
              <div className="flex flex-col gap-2">
                <span className="text-xl font-semibold leading-none">{user.name}</span>
                <span className="text-sm text-muted-foreground leading-none">{user.email}</span>
              </div>
            </div>
            <UpdateProfileForm />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
  
export default Profile;
  