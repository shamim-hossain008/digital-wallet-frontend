import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateUserRoleMutation } from "@/redux/features/Admin-api/admin.api";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  userId: string;
  currentRole: "USER" | "AGENT";
  open: boolean;
  onClose: () => void;
}

function UserRoleModal({ userId, currentRole, open, onClose }: Props) {
  const [role, setRole] = useState<"USER" | "AGENT">(currentRole);
  const [updateUserRole] = useUpdateUserRoleMutation();

  const handleSubmit = async () => {
    try {
      await updateUserRole({ userId, role }).unwrap();
      toast.success("Success", { description: `Role updated to ${role}` });
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Error", {
        description: "Failed to update role",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change User Role</DialogTitle>
          <DialogDescription>
            Select a new role for this user. You can switch between User and
            Agent.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as "USER" | "AGENT")}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="USER">User</option>
            <option value="AGENT">Agent</option>
          </select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UserRoleModal;
