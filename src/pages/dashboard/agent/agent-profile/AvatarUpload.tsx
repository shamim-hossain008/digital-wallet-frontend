/* eslint-disable @typescript-eslint/no-explicit-any */

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateAgentProfileMutation } from "@/redux/features/agent  api/agent.api";
import { Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const MAX_SIZE = 2 * 1024 * 1024;

function AvatarUpload({ profile }: { profile: any }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isRemoved, setIsRemoved] = useState(false);
  const [updateProfile, { isLoading }] = useUpdateAgentProfileMutation();

  useEffect(() => {
    if (profile?.picture) {
      setIsRemoved(false);
    }
  }, [profile?.picture]);

  const onDrop = useCallback(
    async (files: File[]) => {
      const file = files[0];
      if (!file) return;

      if (file.size > MAX_SIZE) {
        toast.error("Image must be under 2MB");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setIsRemoved(false);

      const formData = new FormData();
      formData.append("photo", file);

      try {
        await updateProfile(formData).unwrap();
        toast.success("Profile  updated");
        setPreview(null);
      } catch (err: any) {
        toast.error(err?.data?.message || "Upload failed");
        setPreview(null);
      }
    },
    [updateProfile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleDelete = async () => {
    setIsRemoved(true);
    try {
      await updateProfile({ picture: "" }).unwrap();
      toast.success("Profile picture has been delete successfully");
    } catch {
      toast.error("Failed to delete profile picture");
      setIsRemoved(false);
    }
  };

  const avatarSrc = isRemoved ? "" : preview || profile?.picture || "";

  return (
    <div className="space-y-3">
      {isLoading ? (
        <Skeleton className="h-32 w-32 rounded-full" />
      ) : (
        <Avatar className="h-32 w-32 mx-auto">
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>
            {profile?.name?.charAt(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}

      <div
        {...getRootProps()}
        className={`border border-dashed rounded-md p-3 text-center cursor-pointer text-sm ${
          isDragActive ? "bg-primary/10" : ""
        }`}
      >
        <input {...getInputProps()} />
        Drag & drop or click to upload
      </div>

      {!isRemoved && profile?.picture && (
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={handleDelete}
        >
          <Trash2 size={14} />
          Remove Profile Picture
        </Button>
      )}
    </div>
  );
}

export default AvatarUpload;
