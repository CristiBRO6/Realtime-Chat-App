import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import useUser from '@/hooks/useUser';

import handleFormError from '@/utils/handleFromError';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import updateProfileSchema from '@/schemas/accounts/updateProfileSchema';
import accountService from '@/services/api/accountService';

const UpdataProfileForm = () => {
  const { control, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(updateProfileSchema)
  });

  const [isLoading, setIsLoading] = useState(false);
  const { user, updateUser } = useUser();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const res = await accountService.updateProfile(data);
      
      if(res.data.status){
        toast.success(res.data.message);
        updateUser({ name: data.name });
      }else{
        handleFormError(res.data, setError);
      }
    } catch (err) {
      console.log(err)
      toast.error(err?.response?.data?.message || 'A problem occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-2 width-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Name</span>
        <Controller
          name="name"
          control={control}
          defaultValue={ user.name }
          render={({ field }) => (
            <Input
              type="text"
              autoComplete="name"
              placeholder="Name"
              disabled={isLoading}
              {...field}
            />
          )}
        />
        {errors.name && <span className="text-sm font-medium text-destructive">{errors.name.message}</span>}
      </div>

      <div className="flex justify-end">
        <Button loading={isLoading}>Save</Button>
      </div>

      {errors.root && <span className="text-sm font-medium text-destructive">{errors.root.message}</span>}
    </form>
  )
}

export default UpdataProfileForm;