import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface Props {
  message: string;
}

export default function ErrorAlert({ message }: Props) {
  return (
    <Alert variant="destructive" className="mt-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Terjadi Kesalahan</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
