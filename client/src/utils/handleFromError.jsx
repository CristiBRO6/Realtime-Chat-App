import { toast } from 'sonner';

const handleFormError = (data, setError) => {
  if (data?.path) {
    setError(data.path, {
      type: 'manual',
      message: data.message,
    });
  } else {
    toast.error(data?.message || 'An unknown error occurred');
  }
};

export default handleFormError;