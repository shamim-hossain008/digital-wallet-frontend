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
import { useState } from "react";
import { toast } from "sonner";

interface ChangePasswordDialogProps {
  mutationHook: () => readonly [
    (args: { oldPassword: string; newPassword: string }) => any,
    { isLoading: boolean }
  ];
}

function ChangePasswordDialog({ mutationHook }: ChangePasswordDialogProps) {
  const [open, setOpen] = useState(false);
  const [oldPassword, setOld] = useState("");
  const [newPassword, setNew] = useState("");

  const [changePassword, { isLoading }] = mutationHook();

  const handleSubmit = async () => {
    try {
      await changePassword({ oldPassword, newPassword }).unwrap();
      toast.success("Password changed");
      setOld("");
      setNew("");
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Change Password</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            type="password"
            placeholder="Current password"
            value={oldPassword}
            onChange={(e) => setOld(e.target.value)}
          />
          <Input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNew(e.target.value)}
          />

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? <Spinner /> : " Update Password"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePasswordDialog;
