import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { useAuthStore } from '@/stores/useAuthStore';

import handleFormError from '@/utils/handleFromError';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import PasswordInput from '@/components/ui/PasswordInput';

import loginSchema from '@/schemas/auth/loginSchema';

const LoginForm = () => {
  const { control, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(loginSchema)
  });
  const { login, isLoadingLogin } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      
      if(res.data.status){
        navigate(res.data.redirect);
      }else{
        if(res.data.redirect) navigate(res.data.redirect);
        else handleFormError(res.data, setError);
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
              disabled={isLoadingLogin}
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
              disabled={isLoadingLogin}
              {...field}
            />
          )}
        />
        {errors.password && <span className="text-sm font-medium text-destructive">{errors.password.message}</span>}
      </div>

      <Button className="w-full" loading={isLoadingLogin}>Login</Button>

      {errors.root && <span className="text-sm font-medium text-destructive">{errors.root.message}</span>}
    </form>
  );
};

export default LoginForm;
