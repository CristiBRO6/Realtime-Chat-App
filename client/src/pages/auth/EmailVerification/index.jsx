import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import PageMeta from '@/layouts/PageMeta';

import EmailVerificationForm from '@/pages/auth/EmailVerification/EmailVerificationForm';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

import authService from '@/services/api/authService';
import userService from '@/services/api/userService';

const EmailVerification = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resendCode = async () => {
    setIsLoading(true);

    try {
      const res = await authService.resendCode({ id });

      if(res.data.status) toast.success(res.data.message);
      else toast.error(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message || 'A problem occurred');
    } finally {
      setIsLoading(false);
    }
  }

  const getEmailVerification = useCallback(async () => {
    try {
      const res = await userService.getEmailVerification(id);

      if(!res.data) navigate('/');
    } catch {
      navigate('/');
    }
  }, [id, navigate]);

  useEffect(() => {
    getEmailVerification();
  }, [id, navigate, getEmailVerification]);

  return (
    <>
      <PageMeta title={"Email Verification"} description={"Email Verification"} />

      <div className="grid place-items-center w-full h-full">
        <Card className="max-w-[400px] w-full">
          <CardHeader>
            <CardTitle>Email Verification</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <EmailVerificationForm id={id} />
          </CardContent>
          <CardFooter className="flex items-center justify-center gap-1">
            <span className="text-sm text-muted-foreground">Didn&apos;t receive the code?</span>
            <Button className="" variant="link" onClick={() => resendCode()} loading={isLoading} loadingColor="primary">{isLoading ? "Resending..." : "Resend"}</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default EmailVerification;
