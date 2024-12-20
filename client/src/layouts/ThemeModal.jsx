import { useState } from 'react';
import NiceModal from '@ebay/nice-modal-react';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGropu';
import { Label } from '@/components/ui/Label';
import Button from '@/components/ui/Button';

import useTheme from '@/hooks/useTheme';

const ThemeModal = NiceModal.create(() => {
  const modal = NiceModal.useModal();
  const { theme, setTheme } = useTheme();
  const [themeState, setThemeState] = useState(theme || "system");

  return (
    <Dialog open={modal.visible} onOpenChange={() => NiceModal.remove(modal.id)}>
      <DialogContent className="max-w-[500px] w-full">
        <DialogHeader>
          <DialogTitle>Select Theme</DialogTitle>
          <DialogDescription>Choose your preferred theme for the chat.</DialogDescription>
        </DialogHeader>
        <RadioGroup
          defaultValue={theme}
          onValueChange={(value) => setThemeState(value)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div>
            <RadioGroupItem value="light" id="light" className="peer sr-only" />
            <Label
              htmlFor="light"
              className="flex flex-col items-center justify-between gap-2 rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <div className="w-full rounded-md bg-white p-4">
                <div className="flex items-start space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200" />
                  <div className="bg-gray-100 rounded-md p-2">
                    <div className="w-20 h-2 bg-gray-300 rounded" />
                  </div>
                </div>
              </div>
              <span className="text-sm font-medium text-black">Light</span>
            </Label>
          </div>
          <div>
            <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
            <Label
              htmlFor="dark"
              className="flex flex-col items-center justify-between gap-2 rounded-md border-2 border-muted bg-zinc-950 p-4 hover:bg-zinc-900 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <div className="w-full rounded-md bg-zinc-900 p-4">
                <div className="flex items-start space-x-2">
                  <div className="h-8 w-8 rounded-full bg-zinc-800" />
                  <div className="bg-zinc-800 rounded-md p-2">
                    <div className="w-20 h-2 bg-zinc-700 rounded" />
                  </div>
                </div>
              </div>
              <span className="text-sm font-medium text-white">Dark</span>
            </Label>
          </div>
        </RadioGroup>
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button" onClick={() => setTheme(themeState)}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default ThemeModal;