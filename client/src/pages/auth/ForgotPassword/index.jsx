import PageMeta from '@/layouts/PageMeta';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <>
      <PageMeta title={"Forgot Password"} description={"Forgot Password"} />

      <div className="grid place-items-center w-full h-full">
        <Card className="max-w-[400px] w-full">
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>Enter your email to reset your password</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <ForgotPasswordForm />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
    
export default ForgotPassword;
    