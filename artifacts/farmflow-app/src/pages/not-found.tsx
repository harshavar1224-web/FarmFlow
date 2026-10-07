import { Card, CardContent } from '@workspace/farmflow-design-system/components/ui/card';
import { Button } from '@workspace/farmflow-design-system/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4 text-foreground">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <h1 className="text-2xl font-bold text-foreground">
              404 Page Not Found
            </h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            This page is not part of FarmFlow.
          </p>
          <Button asChild className="mt-6">
            <Link href="/" data-testid="link-not-found-home">Return to FarmFlow</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
