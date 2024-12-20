import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { useAuthStore } from '@/stores/useAuthStore';

import handleFormError from '@/utils/handleFromError';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';

import registerSchema from '@/schemas/auth/registerSchema';
const RegisterForm = () => {
  const { control, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(registerSchema)
  });
  const { register, isLoadingRegister } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await register(data);
      
      if(res.data.status){
        navigate(res.data.redirect);
      }else{
        handleFormError(res.data, setError);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'A problem occurred');
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Name</span>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              type="text"
              autoComplete="name"
              placeholder="Name"
              disabled={isLoadingRegister}
              {...field}
            />
          )}
        />
        {errors.name && <span className="text-sm font-medium text-destructive">{errors.name.message}</span>}
      </div>

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
              disabled={isLoadingRegister}
              {...field}
            />
          )}
        />
        {errors.email && <span className="text-sm font-medium text-destructive">{errors.email.message}</span>}
      </div>
      
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
              disabled={isLoadingRegister}
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
              disabled={isLoadingRegister}
              {...field}
            />
          )}
        />
        {errors.confirmPassword && <span className="text-sm font-medium text-destructive">{errors.confirmPassword.message}</span>}
      </div>

      <Button className="w-full" loading={isLoadingRegister}>Register</Button>

      {errors.root && <span className="text-sm font-medium text-destructive">{errors.root.message}</span>}
    </form>
  );
};

export default RegisterForm;
