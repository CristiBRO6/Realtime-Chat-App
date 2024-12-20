import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { useAuthStore } from '@/stores/useAuthStore';

import handleFormError from '@/utils/handleFromError';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

import forgotPasswordSchema from '@/schemas/auth/forgotPassword';

const ForgotPasswordForm = () => {
  const { control, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(forgotPasswordSchema)
  });
  const { forgotPassword, isLoadingForgotPassword } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await forgotPassword(data);
      
      if (res.data.status) {
        toast.success(res.data.message);
        navigate(`/auth/forgot-password-success?email=${data.email}`);
      } else {
        handleFormError(res.data, setError);
      }
    } catch (err) {
      toast.error(err.response.data.message || 'A problem occurred');
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Email</span>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              type="email"
              autoComplete="email"
              placeholder="Email"
              disabled={isLoadingForgotPassword}
              {...field}
            />
          )}
        />
        {errors.email && <span className="text-sm font-medium text-destructive">{errors.email.message}</span>}
      </div>

      <Button className="w-full" loading={isLoadingForgotPassword}>{isLoadingForgotPassword ? "Sending..." : "Reset Password"}</Button>

      {errors.root && <span className="text-sm font-medium text-destructive">{errors.root.message}</span>}
    </form>
  )
}

export default ForgotPasswordForm;