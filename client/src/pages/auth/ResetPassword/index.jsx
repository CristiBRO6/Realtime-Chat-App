import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';

import PageMeta from '@/layouts/PageMeta';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import ResetPasswordForm from '@/pages/auth/ResetPassword/ResetPasswordForm';

import userService from '@/services/api/userService';

const ResetPassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getResetPassword = useCallback(async () => {
    try {
      const res = await userService.getResetPassword(id);

      if(!res.data) navigate('/');
    } catch {
      navigate('/');
    }
  }, [id, navigate]);
  
  useEffect(() => {
    getResetPassword();
  }, [id, navigate, getResetPassword]);

  return (
    <>
      <PageMeta title={"Reset Password"} description={"Reset Password"} />

      <div className="grid place-items-center w-full h-full">
        <Card className="max-w-[400px] w-full">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <ResetPasswordForm id={id} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
    
export default ResetPassword;
    