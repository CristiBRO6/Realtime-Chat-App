import PropTypes from 'prop-types';
import {  useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuthStore } from '@/stores/useAuthStore';

import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/InputOTP';
import Button from '@/components/ui/Button';

import emailVerificationSchema from '@/schemas/auth/emailVerificationSchema';

const EmailVerificationForm = ({ id }) => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: { code: '' },
  });
  const { emailVerification, isLoadingEmailVerification } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = useCallback(async (data) => {
    try {
      const res = await emailVerification(id, data);
      
      if (res.data.status) {
        navigate(res.data.redirect);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message || 'A problem occurred');
    }
  }, [id, navigate, emailVerification]);

  const code = watch("code");

  useEffect(() => {
    if (code.length === 6) {
      handleSubmit(onSubmit)();
    }
  }, [code, handleSubmit, onSubmit]);

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium">Code</span>
        <div className="flex flex-col items-center">
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <InputOTP 
                maxLength={6}
                disabled={isLoadingEmailVerification}
                {...field}
              >
                <InputOTPGroup>
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}
          />
        </div>
        {errors.code && <span className="text-sm font-medium text-destructive">{errors.code.message}</span>}
      </div>

      <Button className="w-full" loading={isLoadingEmailVerification}>{isLoadingEmailVerification ? "Verifying..." : "Verify"}</Button>

      {errors.root && <span className="text-sm font-medium text-destructive">{errors.root.message}</span>}
    </form>
  );
}

EmailVerificationForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default EmailVerificationForm;
