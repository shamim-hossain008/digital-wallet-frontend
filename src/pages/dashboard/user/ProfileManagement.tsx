/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

import {
  useUpdateUserMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function ProfileManagement() {
  const { data, isLoading: userLoading } = useUserInfoQuery();
  const currentUser = data?.data;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState<string | undefined>();

  const inputRef = useRef<HTMLInputElement>(null);

  // update API
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setPhone(currentUser.phone || undefined);
      inputRef.current?.focus();
    }
  }, [currentUser]);

  // validation: name and phone

  const isDisabled =
    !name ||
    name.length < 2 ||
    !phone ||
    !isValidPhoneNumber(phone) ||
    isLoading;

  const handleUpdate = async () => {
    if (!phone) return;
    try {
      await updateUser({ name, phone }).unwrap();

      toast.success("Profile updated successfully", {
        description: "Your profile information has been saved",
      });
      inputRef.current?.focus();

      setTimeout(() => {
        navigate("/user/dashboard");
      }, 600);
    } catch (error: any) {
      toast.error("Updated failed", {
        description: error?.data?.message || "Something went wrong",
      });
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="max-w-md mx-auto mt-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Profile Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            ref={inputRef}
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={userLoading}
          />
          {/* Phone with with Flags */}
          <div className="phone-input-wrapper">
            <PhoneInput
              international
              defaultCountry="US"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={setPhone}
              disabled={userLoading}
              type="tel"
              className="phone-input"
            />
          </div>

          <Button
            disabled={isDisabled}
            onClick={handleUpdate}
            className="w-full"
          >
            {isLoading ? <Spinner className="w-4 h-4" /> : "Update Profile"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default ProfileManagement;
