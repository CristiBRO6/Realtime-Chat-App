import { Link } from "react-router-dom";

import PageMeta from "@/layouts/PageMeta";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const NotFound = () => {
  return (
    <>
      <PageMeta title={"Not Found"} description={"Not Found"} />

      <div className="grid place-items-center w-full h-full">
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle className="flex justify-center text-center">Oops! Page Not Found</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <span className="text-sm font-medium text-center">We&#39;re sorry, but the page you&#39;re looking for cannot be found.</span>
              <span className="text-sm font-medium text-center">It might have been moved, deleted, or the URL might be incorrect.</span>
              <span className="text-sm font-medium text-center">Please go to the Home Page to continue browsing.</span>
            </div>
            
            <Button asChild>
              <Link to="/">Go home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
    
export default NotFound;
    