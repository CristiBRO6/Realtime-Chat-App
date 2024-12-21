import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import PageMeta from '@/layouts/PageMeta';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";


const ForgotPasswordSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get('email');

  useEffect(() => {
    if(!email) navigate('/auth/login');
  }, [email, navigate])

  return (
    <>
      <PageMeta title={"Email Verification Success"} description={"Email Verification Success"} />

      <div className="grid place-items-center w-full h-full">
        <Card className="w-[350px] mx-auto">
          <CardHeader>
            <CardTitle>Check Your Email</CardTitle>
            <CardDescription>We&apos;ve sent a password reset link to your email</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Alert className="w-full" type="success">Email sent successfully</Alert>
            <span className="block text-center text-sm text-muted-foreground">
              We&apos;ve sent an email to <strong>{email}</strong> with instructions to reset your password.
            </span>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline" asChild>
              <Link to="/auth/login">
                <ArrowLeft className="mr-2 h-4 w-4" /> 
                Back to Login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ForgotPasswordSuccess;