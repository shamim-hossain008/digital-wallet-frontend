/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import { useUpdateAgentProfileMutation } from "@/redux/features/agent  api/agent.api";
import type { IUserInfoData } from "@/types";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import { toast } from "sonner";

export interface IProps {
  profile: IUserInfoData;
}

function EditProfileDialog({ profile }: IProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState<string | undefined>(
    profile.phone || undefined
  );

  const [updateProfile, { isLoading }] = useUpdateAgentProfileMutation();

  // keep dialog values in sync when profile updates
  useEffect(() => {
    setName(profile.name || "");
    setPhone(profile.phone || undefined);
  }, [profile]);

  const handleSave = async () => {
    if (!phone) {
      toast.error("Please enter a phone number");
      return;
    }
    try {
      await updateProfile({ name, phone }).unwrap();
      toast.success("Profile updated successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Name */}
            <Input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Phone number with country selector */}
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">
                Phone Number
              </label>

              <PhoneInput
                international
                defaultCountry="US"
                value={phone}
                onChange={setPhone}
                className="phone-input"
                numberInputProps={{
                  className:
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                }}
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? <Spinner /> : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditProfileDialog;
