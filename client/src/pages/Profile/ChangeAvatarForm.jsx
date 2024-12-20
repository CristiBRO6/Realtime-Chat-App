import { toast } from 'sonner';
import { Pencil, Trash2, Upload } from 'lucide-react';

import useUser from "@/hooks/useUser";

import { ACCEPTED_FILE_TYPES } from '@/constants/uploadConfig';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownSeparator, DropdownTrigger } from '@/components/ui/Dropdown';

import { getUserInitials } from '@/utils/userUtils';

import accountService from '@/services/api/accountService';
import changeAvatarSchema from '@/schemas/accounts/changeAvatarSchema';
import { useState } from 'react';

const ChangeAvatarForm = () => {
	const { user, updateUser } = useUser();
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleChange = async (e) => {
		const avatar = e.target.files[0];

    const parsed = changeAvatarSchema.safeParse({ avatar });

    if (!parsed.success) return toast.error(parsed.error.errors[0]?.message || "Invalid file");

    const formData = new FormData();
    formData.append('avatar', avatar);

    try {
      const res = await accountService.changeAvatar(formData);

      if (res.data.status) {
        toast.success(res.data.message);

        setOpenDropdown(false);
        updateUser({ avatar: res.data.imageUrl });
      }
    } catch (err) {
      toast.error(err.response.data.message || 'A problem occurred');
    }
  };

  const onDelete = async () => {
    try {
      const res = await accountService.deleteAvatar();

      if (res.data.status) {
        toast.success(res.data.message);
        updateUser({ avatar: '' });
      }
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || 'A problem occurred');
    }
  };

  return (
    <div className="relative">
      <Avatar className="size-20">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback className="text-lg">{getUserInitials(user.name)}</AvatarFallback>
      </Avatar>
      <Dropdown open={openDropdown} onOpenChange={setOpenDropdown}>
        <DropdownTrigger asChild>
          <div className="absolute bottom-0 right-0 bg-background hover:bg-accent hover:text-accent-foreground p-1.5 cursor-pointer transition-colors rounded-full shadow-lg">
            <Pencil className="w-4 h-4" />
          </div>
        </DropdownTrigger>
        <DropdownContent align="center">
          <DropdownGroup>
            <label>
              <DropdownItem onSelect={(e) => e.preventDefault()}>
                <Upload className="w-4 h-4" />
                Upload
              </DropdownItem>
              <input className="hidden" type="file" accept={ACCEPTED_FILE_TYPES} onChange={(e) => handleChange(e)} />
            </label>
            <DropdownSeparator />
            <DropdownItem onClick={onDelete} danger>
              <Trash2 className="w-4 h-4" />
              Delete
            </DropdownItem>
          </DropdownGroup>
        </DropdownContent>
      </Dropdown>
    </div>
	);
}

export default ChangeAvatarForm;