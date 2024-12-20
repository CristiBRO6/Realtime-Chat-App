import { Link } from 'react-router-dom';

import PageMeta from '@/layouts/PageMeta';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import RegisterForm from './RegisterForm';
import Button from '@/components/ui/Button';

const Register = () => {
  return (
    <>
      <PageMeta title={"Register"} description={"Register"} />

      <div className="grid place-items-center w-full h-full">
        <Card className="max-w-[400px] w-full">
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <RegisterForm />
            <div className="w-full flex justify-start">
              <Button variant="link" asChild>
                <Link to="/auth/login">Login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
    
export default Register;
    