import { Link } from 'react-router-dom';

import PageMeta from '@/layouts/PageMeta';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import LoginForm from './LoginForm';
import Button from '@/components/ui/Button';

const Login = () => {
  return (
    <>
      <PageMeta title={"Login"} description={"Login"} />

      <div className="grid place-items-center w-full h-full">
        <Card className="max-w-[400px] w-full">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <LoginForm />
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-between">
              <Button variant="link" asChild>
                <Link to="/auth/register">Register</Link>
              </Button>
              <Button variant="link" asChild>
                <Link to="/auth/forgot-password">Forgot password?</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
    
export default Login;
    