import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import handleFormError from '@/utils/handleFromError';

import Button from '@/components/ui/Button';
import PasswordInput from '@/components/ui/PasswordInput';

import changePasswordSchema from '@/schemas/accounts/changePasswordSchema';
import accountService from '@/services/api/accountService';

const ChangePasswordForm = () => {
  const { control, handleSubmit, reset, formState: { errors }, setError } = useForm({
    resolver: zodResolver(changePasswordSchema)
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const res = await accountService.changePassword(data);

      if (res.data.status) {
        toast.success(res.data.message);
        reset();
      } else {
        handleFormError(res.data, setError);
        }
    } catch (err) {
      toast.error(err.response?.data?.message || 'A problem occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-2 width-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Current Password</span>
        <Controller
          name="currentPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <PasswordInput
              autoComplete="currentPassword"
              placeholder="Current Password"
              disabled={isLoading}
              {...field}
            />
          )}
        />
        {errors.currentPassword && <span className="text-sm font-medium text-destructive">{errors.currentPassword.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">New Password</span>
        <Controller
          name='newPassword'
          control={control}
          defaultValue=""
          render={({ field }) => (
            <PasswordInput
              autoComplete='newPassword'
              placeholder='New Password'
              disabled={isLoading}
              {...field}
            />
          )}
        />
        {errors.newPassword && <span className="text-sm font-medium text-destructive">{errors.newPassword.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Confirm Password</span>
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <PasswordInput
              autoComplete="confirmPassword"
              placeholder="Confirm Password"
              disabled={isLoading}
              {...field}
            />
          )}
        />
        {errors.confirmPassword && <span className="text-sm font-medium text-destructive">{errors.confirmPassword.message}</span>}
      </div>
      
      <div className="flex justify-end">
        <Button loading={isLoading}>Change</Button>
      </div>

      {errors.root && <span className="text-sm font-medium text-destructive">{errors.root.message}</span>}
    </form>
  );
};

export default ChangePasswordForm;
