import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import PageMeta from "@/layouts/PageMeta";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";

const Error = () => {
  const [message, setMessage] = useState(null);
  const [redirect, setRedirect] = useState("/");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      setRedirect(location.state?.redirect || "/");
      window.history.replaceState({}, document.title);
    } else {
      navigate("/");
    }
  }, [location.state, navigate]);

  return (
    <>
      <PageMeta title="Auth Error" description="An error occurred" />

      <div className="grid place-items-center w-full h-full">
        <Card className="max-w-[400px] w-full">
          <CardHeader>
            <CardTitle>Auth Error</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert type="error" className="w-full">{message}</Alert>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to={redirect}>
                <ArrowLeft className="h-4 w-4" />
                Go back
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Error;
