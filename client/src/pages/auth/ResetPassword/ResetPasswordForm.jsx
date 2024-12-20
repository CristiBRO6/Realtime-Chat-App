import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { useAuthStore } from '@/stores/useAuthStore';

import handleFormError from '@/utils/handleFromError';

import Button from '@/components/ui/Button';
import PasswordInput from '@/components/ui/PasswordInput';

import resetPasswordSchema from '@/schemas/auth/resetPasswordSchema';

const ResetPasswordForm = ({ id }) => {
  const { control, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(resetPasswordSchema)
  });
  const { resetPassword, isLoadingResetPassword } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await resetPassword(id, data);
      
      if(res.data.status){
        navigate(res.data.redirect);
      }else{
        handleFormError(res.data, setError);
      }
    } catch (err) {
      toast.error(err.response.data.message || 'A problem occurred');
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Password</span>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <PasswordInput
              autoComplete="password"
              placeholder="Password"
              disabled={isLoadingResetPassword}
              {...field}
            />
          )}
        />
        {errors.password && <span className="text-sm font-medium text-destructive">{errors.password.message}</span>}
      </div>
      
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Confirm Password</span>
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <PasswordInput
              autoComplete="password"
              placeholder="Confirm Password"
              disabled={isLoadingResetPassword}
              {...field}
            />
          )}
        />
        {errors.confirmPassword && <span className="text-sm font-medium text-destructive">{errors.confirmPassword.message}</span>}
      </div>

      <Button className="w-full" loading={isLoadingResetPassword}>Reset password</Button>

      {errors.root && <span className="text-sm font-medium text-destructive">{errors.root.message}</span>}
    </form>
  )
}

ResetPasswordForm.propTypes = {
  id: PropTypes.node.isRequired,
};

export default ResetPasswordForm;